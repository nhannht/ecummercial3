import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

export function MainImagePicker(props: {
    selectedImage: File | null,
    handleImagePick: (event: React.ChangeEvent<HTMLInputElement>) => void,
    imagePreviewUrl: string | null,

}) {


    return (
        <div className="grid w-full max-w-sm items-start gap-4">
            <div className="grid gap-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <Input id="image" type="file" accept="image/*" onChange={props.handleImagePick}/>
                    </div>
                    {props.imagePreviewUrl && (
                        <img
                            src={props.imagePreviewUrl}
                            alt="Product Image"
                            width={100}
                            height={100}
                            className="rounded-md object-cover"
                            style={{aspectRatio: "100/100", objectFit: "cover"}}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}