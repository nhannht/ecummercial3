import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {X} from "lucide-react";

export function OtherImagesPicker(props: {
    selectedOtherImages: File[],
    imagePreviewUrls: string[],
    handleImagesPick: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleRemoveImage: (number) => void
}) {


    return (
        <div className="grid w-full max-w-sm items-start gap-4">
            <div className="grid gap-2">
                <Label htmlFor="other-images">Other Product Images</Label>
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <Input id="other-images" type="file" accept="image/*" multiple
                               onChange={props.handleImagesPick}/>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                    {props.imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative">
                            <img
                                src={url}
                                alt={`Product Image ${index + 1}`}
                                width={100}
                                height={100}
                                className="rounded-md object-cover"
                                style={{aspectRatio: "100/100", objectFit: "cover"}}
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-1 right-1 h-6 w-6 p-0"
                                onClick={() => props.handleRemoveImage(index)}
                            >
                                <X className="h-4 w-4"/>
                                <span className="sr-only">Remove</span>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}