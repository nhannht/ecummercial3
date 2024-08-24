import useLocalStorageState from "use-local-storage-state";
import {Cart, Order} from "@/lib/global";
import {useEffect, useState} from "react";
import {CheckoutAddressForm} from "@/components/shop/checkout/CheckoutAddressForm.tsx";
import {CartForm} from "@/components/shop/checkout/CartForm.tsx";

export type CartDisplayInformation = {
  productId?: number;
  productName: string;
  quantity: number;
  cost: number}[]
export default function Checkout() {
  const [cart,_setCart] = useLocalStorageState<Cart>(`cart`, {
    defaultValue: {orderItems: []},
  })
  const [order, setOrder] = useState<Order>({})
  const [cartDisplayInformation,setCartDisplayInformation] = useState<CartDisplayInformation>([])

  useEffect(()=>{
    if (order.OrderItems){
      const t = order.OrderItems?.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.productId === item.ProductID);
        if (existingItem) {
          existingItem.quantity += 1;
          existingItem.cost += item.Product?.Price || 0;
        } else {
          acc.push({
            productId: item.ProductID,
            productName: item.Product?.Name || "Unknown Product",
            quantity: 1,
            cost: item.Product?.Price || 0,
          });
        }


        acc.sort((a, b) => a.productName.localeCompare(b.productName))

        return acc;
      }, [] as CartDisplayInformation);
      setCartDisplayInformation(t)
    }
  },[order])



  useEffect(() => {
    const validateOrder = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/checkout/validate-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cart),
        });

        if (!response.ok) {
          throw new Error('Failed to validate order');
        }

        const data = await response.json();
        setOrder(data.tempOrder);
      } catch (error) {
        console.error('Error validating order:', error);
      }
    };

    validateOrder();
  }, [cart]);

  return (
    <div className="grid gap-8 px-4 py-8 md:px-6 md:py-12 lg:grid-cols-2 lg:gap-12">
      <CheckoutAddressForm/>
      <CartForm cartDisplayInformation={cartDisplayInformation}
      placeOrderHandler={()=>{}}
      />
    </div>
  )
}