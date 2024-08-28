import {Category} from "@/lib/global";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {cn} from "@/lib/utils.ts";



export function CategoryPicker(props: {
    categories: Category[]
    selectedCategories: Category[],
    handleSelectCategory: (categoryID: number ) => void,
    handleRemoveCategory: (categoryID: number ) => void,
}) {
    const [open, setOpen] = useState(false)


    // @ts-ignore
    return (
        <div className="flex flex-col space-y-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        Select categories...
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search categories..."/>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            <CommandList>
                                {props.categories.map((category) => (
                                    <CommandItem
                                        key={category.CategoryName}
                                        // @ts-ignore
                                        onSelect={() => props.handleSelectCategory(category.ID)}>
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                props.selectedCategories.find(c => c.ID === category.ID) ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {category.CategoryName}
                                    </CommandItem>
                                ))}

                            </CommandList>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

        </div>
    )
}