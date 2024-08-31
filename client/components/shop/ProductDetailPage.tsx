import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductDetails from "@/components/shop/ProductDetails.tsx";
import {Product} from "@/lib/global.ts";

export default function ProductDetailPage (){
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product >({
        Categories: [],
        Description: "",
        ID: 0,
        Image: "",
        Name: "",
        OrderItems: [],
        OtherImages: [],
        Price: 0,
        Reviews: [],
        Stock: 0,
        UpdatedAt: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        async function fetchProduct(){
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/products/${id}`)
                if (!response.ok) {
                    return response.text().then(text =>{
                        throw new Error(`Server Error: ${text} (${response.status})`);
                    })

                }
                const data = await response.json()
                setProduct(data.data)

            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                }
            } finally {
                setLoading(false)
            }
        }
        fetchProduct().then(_ => null)
    },[id])

    if (loading){
        return <div>Loading...</div>
    }
    if (error){
        return <div> Error: {error}</div>
    }

    if (!product){
        return <div>Product not found</div>
    }

    if (product.ID !== 0){
        return <ProductDetails product={product}/>
    }

    return <ProductDetails
        name={product.Name ? product.Name : ""}
        description={product.Description ? product.Description : ""}
        mainImageUrl={product.Image ? product.Image :"/placeholder.svg"}
        mainImageAlt={"Place holder alt"}
        otherImageUrls={product.OtherImages ? product.OtherImages : []}
        productPrice={product.Price}
        reviews={product.Reviews}
        categories={product.Categories}
    />
}