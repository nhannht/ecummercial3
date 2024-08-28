import {SortChoice, SortOption} from "@/lib/global.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ListOrderedIcon} from "lucide-react";
import {DropdownMenuRadioGroup} from "@radix-ui/react-dropdown-menu";
import {useState} from "react";

const SortSettingsComponent = (props: {
    choices: SortChoice[],
    handleSort: (sorts: SortOption[]) => void
}) => {

    const [choiceID,setChoiceID] = useState(props.choices[0].ID)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListOrderedIcon className="h-4 w-4"/>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">{props.choices.find(c=>c.ID === choiceID)?.description}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by: {choiceID} </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuRadioGroup
                    value={choiceID}

                    onValueChange={(value)=>{
                        const choice = props.choices.find(c=> c.ID === value)
                        if (choice){
                            props.handleSort(choice.orders)

                    }
                        setChoiceID(value)
                    }}

                >
                    {props.choices.map(choice => (
                        <DropdownMenuRadioItem
                            key={choice.ID}
                            value={choice.ID}>
                            {choice.description}
                        </DropdownMenuRadioItem>))
                    }
                </DropdownMenuRadioGroup>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export {SortSettingsComponent}