import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";

export function CheckoutAddressForm() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" placeholder="Enter your address" rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Enter your city" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" placeholder="Enter your state" />
                        </div>
                    </div>
                    {/*<div className="grid grid-cols-2 gap-4">*/}
                    {/*    <div className="grid gap-2">*/}
                    {/*        <Label htmlFor="zip">Zip Code</Label>*/}
                    {/*        <Input id="zip" placeholder="Enter your zip code" />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="Enter your phone number" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="note">Note</Label>
                        <Textarea id="note" placeholder="Enter any notes" rows={3} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Gender</Label>
                        <RadioGroup>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female">Female</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}