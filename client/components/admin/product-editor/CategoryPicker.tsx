import {Category} from "@/lib/global";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Check, ChevronsUpDown, X} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {cn} from "@/lib/utils.ts";
import {Badge} from "@/components/ui/badge.tsx";

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
                                                props.selectedCategories.includes(category) ? "opacity-100" : "opacity-0"
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

            <div className="space-y-2">
                <h3 className="text-sm font-medium">Selected Categories:</h3>
                {props.selectedCategories.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No categories selected</p>
                ) : (
                    <ul className="flex flex-row flex-wrap items-center justify-center space-x-2 ">
                        {props.selectedCategories.map((category) => (
                            <li key={category.ID} className="flex items-center space-x-2 my-1">
                                <Badge variant="outline">
                                    {props.categories.find(c => c.ID === category.ID)?.CategoryName}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0 ml-2"

                                        //@ts-ignore
                                        onClick={() => props.handleRemoveCategory(category.ID)}
                                    >
                                        <X className="h-4 w-4"/>
                                        <span className="sr-only">Remove</span>
                                    </Button>
                                </Badge>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}