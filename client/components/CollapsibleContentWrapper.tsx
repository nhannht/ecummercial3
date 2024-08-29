import {PropsWithChildren, useState} from "react";
import {Button} from "@/components/ui/button.tsx";

export function CollapsibleContentWrapper(props: PropsWithChildren) {

    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[10000px]" : "max-h-[200px]"}`}
            >
                <div className="prose prose-gray dark:prose-invert">
                    {props.children}
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <Button variant={isExpanded ? "outline" : "default"} onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "Show Less" : "Show More"}
                </Button>
            </div>
        </div>
    )
}