import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductDetails from "@/components/shop/ProductDetails.tsx";
import {Product} from "@/lib/global.ts";

export default function ProductDetailPage (){
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        async function fetchProduct(){
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/products/${id}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch product");

                }
                const data = await response.json()
                setProduct(data.data)

            } catch (error) {
                // @ts-ignore
                setError(error.message)
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

    return <ProductDetails
        name={product.Name}
        description={product.Description}
        mainImageUrl={product.Image}
        mainImageAlt={"Place holder alt"}
        otherImageUrls={product.OtherImages}
        productPrice={product.Price}
        reviews={product.Reviews}
        categories={product.Categories}
    />
}