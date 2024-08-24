import React, {useEffect, useMemo} from 'react';
import { ShoppingCartIcon } from 'lucide-react'; // You can use any icon library you prefer
import {Button} from "@/components/ui/button.tsx";
import useLocalStorageState from "use-local-storage-state";
import {Link} from "react-router-dom";
import {Cart} from "@/lib/global";

const CartSymbol: React.FC = () => {
    const [cartValue,setCartValue] = useLocalStorageState<Cart>(`cart`, {
        defaultValue: {
            orderItems: [],
        },
    });

    // Calculate the total number of items in the cart

      const totalItems = useMemo(()=>{
          if (!cartValue.orderItems) setCartValue({orderItems: []});
         return cartValue.orderItems.length || 0
     },[cartValue])

    useEffect(() => {
     // console.log(cartValue)
    },[cartValue])

    return (
        <Link to={"/checkout"}>
            <Button
                variant={"ghost"} size={"default"} className="relative">
                <ShoppingCartIcon className="w-6 h-6" />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {totalItems}
                </span>
                )}

            </Button>
        </Link>
    );
};

export default CartSymbol;