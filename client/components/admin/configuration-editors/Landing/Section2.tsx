import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../../../ui/card";
import {Label} from "../../../ui/label";
import {ImageIcon} from "lucide-react";
import {Input} from "../../../ui/input";
import {Textarea} from "../../../ui/textarea";
import {Button} from "../../../ui/button";

export default function Section2(){
    return <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Item 1</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="image">Product Image</Label>
                    <div className="flex items-center justify-center w-full h-64 bg-gray-200 rounded-md">
                        <ImageIcon className="w-16 h-16 text-gray-400"/>
                    </div>
                    <Input id="image" type="file" className="mt-2"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter the product title"
                           defaultValue="Discover Our Featured Product"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter the product description" className="min-h-[100px]">
                        Explore our latest and greatest product, designed with quality and style in mind.
                    </Textarea>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="buttonText">Button Text</Label>
                    <Input id="buttonText" placeholder="Enter the button text" defaultValue="Shop Now"/>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="ml-auto">Save Changes</Button>
            </CardFooter>
        </Card>
}