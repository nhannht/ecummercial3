import { SVGProps, useState} from "react"
import {Button} from "@/components/ui/button"
import {JSX} from "react/jsx-runtime"

export default function Component() {
    const [cart, setCart] = useState([
        {
            id: 1,
            name: "Acme Circles T-Shirt",
            price: 99,
            quantity: 1,
            image: "/placeholder.svg",
        },
        {
            id: 2,
            name: "Cozy Blanket",
            price: 29.99,
            quantity: 2,
            image: "/placeholder.svg",
        },
        {
            id: 3,
            name: "Autumn Mug",
            price: 12.99,
            quantity: 1,
            image: "/placeholder.svg",
        },
    ])
    const updateQuantity = (id: number, quantity: number) => {
        setCart(cart.map((item) => (item.id === id ? {...item, quantity} : item)))
    }
    const removeItem = (id: number) => {
        setCart(cart.filter((item) => item.id !== id))
    }
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            <div className="grid gap-8">
                <div className="grid gap-6">
                    {cart.map((item) => (
                        <div key={item.id} className="grid grid-cols-[100px_1fr_100px] items-center gap-4">
                            <img
                                src="/placeholder.svg"
                                alt={item.name}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover"
                                style={{aspectRatio: "100/100", objectFit: "cover"}}
                            />
                            <div className="grid gap-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity === 1}
                                >
                                    <MinusIcon className="h-4 w-4"/>
                                </Button>
                                <span className="text-base font-medium">{item.quantity}</span>
                                <Button size="icon" variant="outline"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                    <PlusIcon className="h-4 w-4"/>
                                </Button>
                                <Button size="icon" variant="outline" onClick={() => removeItem(item.id)}>
                                    <TrashIcon className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-muted/40 rounded-lg p-6 grid gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Total</h3>
                        <p className="text-2xl font-bold">${total.toFixed(2)}</p>
                    </div>
                    <Button size="lg" className="w-full">
                        Proceed to Checkout
                    </Button>
                </div>
            </div>
        </div>
    )
}

function MinusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}


function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}