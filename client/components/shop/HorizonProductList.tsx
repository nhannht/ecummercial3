import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import  {PropsWithChildren} from "react";
import {Product} from "@/components/shop/shop";

function ProductCard(props:PropsWithChildren< {
    name: string,
    description: string,
    price: number

}>) {
    return <Card>
        {props.children}

        <CardContent className="p-4">
            <h3 className="text-lg font-semibold">{props.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{props.description}</p>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold">{props.price}</span>
                <Button size="sm">Add to Cart</Button>
            </div>
        </CardContent>
    </Card>;
}


export default function HorizonProductList(props: {
    products: Product[]
}) {
    return (
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 px-4 md:px-6">
                {props.products.map((product) => (
                    <div className="flex-shrink-0 w-[280px] md:w-[320px]">
                        {/*@ts-ignore*/}
                        <ProductCard {...product} />
                    </div>
                ))}


            </div>
        </div>
    )
}