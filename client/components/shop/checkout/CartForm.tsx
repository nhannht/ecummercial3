import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CartDisplayInformation} from "@/components/shop/Checkout.tsx";
import {Cart} from "@/components/shop/shop";
import useLocalStorageState from "use-local-storage-state";
import {MinusIcon, PlusIcon} from "lucide-react";

export function CartForm(props: {
    cartDisplayInformation: CartDisplayInformation;
    placeOrderHandler: () => void;
}) {
    // Transform OrderItems to CartDisplayInformation


    const subtotal = props.cartDisplayInformation.reduce((acc, item) => acc + item.cost, 0);
    const shipping = 10; // Example shipping cost
    const tax = subtotal * 0.1; // Example tax calculation
    const total = subtotal + shipping + tax;

    const [cart, setCart] = useLocalStorageState<Cart>(`${import.meta.env.VITE_APP_NAME}_cart`, {
        defaultValue: {orderItems: []},
    })

    const handleIncrement = (productId: number) => {
        setCart({
            orderItems: [...cart.orderItems, {
                ProductID: productId

            }]
        });
    }
    const handleDecrement = (productId: number) => {
        const index = cart.orderItems.findIndex((i) => i.ProductID === productId);
        cart.orderItems.splice(index, 1);

        setCart(cart);
    }

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <Separator/>
                        <div className="flex items-center justify-between font-medium">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <h3 className="text-lg font-medium">Items in Cart</h3>
                        <div className="grid gap-4">
                            {props.cartDisplayInformation.map((item) => (
                                <div key={item.productId} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src="/placeholder.svg"
                                            alt="Product Image"
                                            width={64}
                                            height={64}
                                            className="rounded-md"
                                            style={{aspectRatio: "64/64", objectFit: "cover"}}
                                        />
                                        <div>
                                            <div className="font-medium">{item.productName}</div>
                                            <div className="flex items-center gap-2 ">
                                                <div className="text-sm text-muted-foreground">Quantity: {item.quantity}</div>
                                                <button onClick={() => handleIncrement(item.productId)}><PlusIcon
                                                    className="w-4 h-4" fill="currentColor"/></button>
                                                <button onClick={() => handleDecrement(item.productId)}><MinusIcon
                                                    className="w-4 h-4" fill="currentColor"/></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="font-medium">${item.cost.toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={props.placeOrderHandler}
                        className="w-full">Place Order</Button>
                </CardFooter>
            </Card>
        </div>
    );
}