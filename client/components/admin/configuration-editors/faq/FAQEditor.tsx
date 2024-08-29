import {useCallback, useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {FAQItem} from "@/lib/global.ts";
import useLocalStorageState from "use-local-storage-state";
import {faqitemsplacefallback} from "@/lib/utils.ts";
import {useToast} from "@/components/ui/use-toast.ts";

export default function FAQEditor() {
    const [faqs, setFaqs] = useState<FAQItem[]>(faqitemsplacefallback)
    const [editingFaq, setEditingFaq] = useState<FAQItem|null>(null)
    const [newFaq, setNewFaq] = useState({ question: "", answer: "" })
    const [token] = useLocalStorageState<string>("token", { defaultValue: "" })
    const {toast} = useToast()
    const handleFaqEdit = (faq) => {
        setEditingFaq(faq)
    }
    const handleFaqSave = (updatedFaq) => {
        setFaqs(faqs.map((faq) => (faq.id === updatedFaq.id ? updatedFaq : faq)))
        setEditingFaq(null)
    }
    const handleFaqDelete = (faqId) => {
        setFaqs(faqs.filter((faq) => faq.id !== faqId))
    }
    const handleFaqDrag = (dragIndex, hoverIndex) => {
        const updatedFaqs = [...faqs]
        const [removedFaq] = updatedFaqs.splice(dragIndex, 1)
        updatedFaqs.splice(hoverIndex, 0, removedFaq)
        setFaqs(updatedFaqs)
    }
    const handleNewFaqChange = (e, field) => {
        setNewFaq({ ...newFaq, [field]: e.target.value })
    }
    const handleNewFaqSubmit = () => {
        if (newFaq.question.trim() && newFaq.answer.trim()) {
            setFaqs([...faqs, { id: faqs.length + 1, question: newFaq.question, answer: newFaq.answer }])
            setNewFaq({ question: "", answer: "" })
        }
    }

    const handleFaqSaveToServer = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/config/faq`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(faqs),
            });

            if (!response.ok) {
                return response.text().then(text=>{
                    toast({description: "Failed to save FAQs to the server" });
                    throw new Error(`Failed to save FAQs to the server ${text}`);
                })

            }

            const result = await response.json();
            console.log("FAQs saved successfully:", result);
        } catch (error) {
            toast({description: "Failed to save FAQs to the server" })
            console.error("Error saving FAQs to the server:", error);
        }
    };

    const getFAQFromServer = useCallback(async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/config/faq`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },

                });

                if (!response.ok) {
                    throw new Error("Failed to save FAQs to the server");
                }

                const result = await response.json();
                setFaqs(result)

            } catch (error) {
                console.error("Error saving FAQs to the server:", error);
            }
        },[]
    )
    useEffect(  () => {
        getFAQFromServer().then()
    },[])


    return (
        <div className="flex flex-col h-screen">
            <main className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">FAQ Editor</h1>
                        <Button onClick={handleFaqSaveToServer}>Save to Server</Button>

                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={faq.id}
                                className="bg-white rounded-lg shadow-md p-4 cursor-move"
                                onDragOver={(e) => e.preventDefault()}

                                onDrop={(e) => {
                                    e.preventDefault()
                                    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"))
                                    handleFaqDrag(dragIndex, index)
                                }}
                                draggable
                                onDragStart={(e) => e.dataTransfer.setData("text/plain", String(index))}
                            >
                                {editingFaq?.id === faq.id ? (
                                    <div className="space-y-2">
                                        <Input
                                            type="text"
                                            defaultValue={faq.question}
                                            onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                                        />
                                        <Textarea
                                            defaultValue={faq.answer}
                                            onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                                        />
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" onClick={() => setEditingFaq(null)}>
                                                Cancel
                                            </Button>
                                            <Button onClick={() => handleFaqSave(editingFaq)}>Save</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-lg font-bold">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                        <div className="flex justify-end gap-2 mt-2">
                                            <Button variant="outline" size="sm" onClick={() => handleFaqEdit(faq)}>
                                                Edit
                                            </Button>
                                            <Button variant="outline" size="sm" color="red" onClick={() => handleFaqDelete(faq.id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 space-y-2">
                        <Input
                            type="text"
                            placeholder="New FAQ Question"
                            value={newFaq.question}
                            onChange={(e) => handleNewFaqChange(e, "question")}
                        />
                        <Textarea
                            placeholder="New FAQ Answer"
                            value={newFaq.answer}
                            onChange={(e) => handleNewFaqChange(e, "answer")}
                        />
                        <Button onClick={handleNewFaqSubmit}>Add FAQ</Button>
                    </div>
                </div>
            </main>
        </div>
    )
}