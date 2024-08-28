import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {FAQItem} from "@/lib/global.ts";
import {useCallback, useEffect, useState} from "react";
import {faqitemsplacefallback} from "@/lib/utils.ts";

function FAQItemAccord(props:{
  id:number,
  question:string,
  answer:string
}) {
  return <AccordionItem value={String(props.id)}>
    <AccordionTrigger className="flex justify-between items-center w-full py-4 border-b border-border">
      <h3 className="text-lg font-medium">{props.question}</h3>
    </AccordionTrigger>
    <AccordionContent className="py-4">
      <p className="text-muted-foreground">{props.answer}</p>
    </AccordionContent>
  </AccordionItem>;
}

function FAQMain(props:{
  items: FAQItem[]
}) {
  return <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <p className="text-muted-foreground mb-8">
        Here are some of the most common questions we receive and their answers. If you have any other questions,
        please don't hesitate to contact us.
      </p>
      <Accordion type="single" collapsible>
        {props.items.map((faq) => (
            <FAQItemAccord answer={faq.answer} question={faq.question} id={faq.id} key={faq.id} />
        ))}

      </Accordion>
    </div>
  </div>;
}

export default function FAQ() {
  const [faq,setFAQ] = useState<FAQItem[]>(faqitemsplacefallback);
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
          setFAQ(result)

        } catch (error) {
          console.error("Error saving FAQs to the server:", error);
        }
      },[]
  )

  useEffect(() => {
    getFAQFromServer().then()
  }, []);

  return (
    <FAQMain items={faq} />
  )
}