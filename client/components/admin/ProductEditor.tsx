import {useEffect, useState} from 'react';
import {Category, Product, Review} from "@/lib/global";
import {useLocation, useParams} from "react-router-dom";
import {CategoryPicker} from "@/components/admin/product-editor/CategoryPicker.tsx";
import {MainImagePicker} from "@/components/admin/product-editor/MainImagePicker.tsx";
import {OtherImagesPicker} from "@/components/admin/product-editor/OtherImagesPicker.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import ProductDescriptionEditor from "@/components/admin/ProductDescriptionEditor.tsx";
import {Button} from "@/components/ui/button.tsx";
import ProductDetails from "@/components/shop/ProductDetails.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import useLocalStorageState from "use-local-storage-state";


const ProductEditor = () => {
    const [token] = useLocalStorageState('token',{defaultValue:""})
    const {id} = useParams(); // Get the route parameters
    const location = useLocation(); // Get the current path
    const isEditMode = location.pathname.includes('/edit');
    const [isDirty, setIsDirty] = useState(false); // Track unsaved changges

    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [description, setDescription] = useState<string>('');

    const [mainImage, setMainImage] = useState<File | null>(null);
    const [mainImageUrl, setMainImageUrl] = useState<string>('');

    const [otherImages, setOtherImages] = useState<File[]>([]);
    const [otherImageUrls, setOtherImageUrls] = useState<string[]>([]);

    const [categories, setCategories] = useState<Category[]>([]);
    const [pickedCategories, setPickedCategories] = useState<Category[]>([]);
    const [reviews,setReviews] = useState<Review[]>([]);


    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/categories`)
            .then(response => response.json())
            .then(data => setCategories(data.data))
            .catch(error => console.error('Error fetching categories:', error));

        if (isEditMode && id) {
            fetch(`${import.meta.env.VITE_SERVER_URL}/products/${id}`)
                .then(response => response.json())
                .then((product) => {
                    const productData: Product = product.data;
                    //@ts-ignore
                    setName(productData.Name);setPrice(productData.Price);
                    // setStock(product.stock);
                    //@ts-ignore
                    setDescription(productData.Description);
                    productData.Image?.trim() !== "" && setMainImageUrl(`${import.meta.env.VITE_SERVER_URL}/${productData.Image}`);
                    productData.OtherImages && productData.OtherImages.forEach((image) => {
                        otherImageUrls.push(`${import.meta.env.VITE_SERVER_URL}/${image}`)
                    })
                    // console.log(otherImageUrls)
                    let t = [...new Set(otherImageUrls)]
                    setOtherImageUrls(t);
                    // @ts-ignore
                    setPickedCategories(productData.Categories);
                    // @ts-ignore
                    setReviews(productData.Reviews);
                    // console.log(product);
                    // console.log(product.Categories)

                }).catch(error => console.error('Error fetching product:', error));
        }

    }, [isEditMode, id, isDirty]);

    const handleSelectCategory = (currentID: number) => {
        setPickedCategories((prev) => {
            const category = categories.find(category => category.ID === currentID);
                return category ?
                    (prev.some(cat => cat.ID === currentID) ? prev.filter(cat => cat.ID !== currentID) : [...prev, category])
                    : prev;
            }
        );
        setIsDirty(true)
    }

    const handleMainImagePick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setMainImage(file)
            setMainImageUrl(imageUrl)
            setIsDirty(true)
        }

    }

    const handleOtherImagesPick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length > 0) {
            const newImages = files;
            const newUrls = files.map(file => URL.createObjectURL(file));
            setOtherImages(prevImages => [...newImages, ...prevImages]);
            setOtherImageUrls(prevUrls => [...newUrls, ...prevUrls]);
            setIsDirty(true)
        }

    }
    const handleOtherImagesRemove = (index: number) => {
        setOtherImages(prevImages => prevImages.filter((_, i) => i !== index));
        setOtherImageUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
        setIsDirty(true)
    }

    const handleRemoveCategory = (categoryID: number) => {
        setPickedCategories((prev) => prev.filter((item) => item.ID !== Number(categoryID)));
        setIsDirty(true)
    }

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Price', price.toString());
        formData.append('Stock', stock.toString());
        formData.append('Description', description);
        if (mainImage) {
            formData.append('Image', mainImage);
        }
        console.log(otherImages);
        otherImages.forEach((image) => {
            formData.append(`OtherImages[]`, image);
        });
        pickedCategories.forEach((category) => {
            formData.append(`Categories[]`, category.ID ? category.ID?.toString(): "");
        });
        // console.log([...formData]);

        try {
            const response = isEditMode && id
                ? await fetch(`${import.meta.env.VITE_SERVER_URL}/products/${id}`, {
                    method: 'PUT',
                    body: formData,
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                })
                : await fetch(`${import.meta.env.VITE_SERVER_URL}/products`, {
                    method: 'POST',
                    body: formData,
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });

            if (!response.ok) {
                return response.text().then(text => {
                    toast({description:"Error in server response, please contact engineer team"})
                    throw new Error(`Server response with status ${response.status} and error is ${text}`);
                })
            }

            const data = await response.json();
            console.log('Product saved successfully:', data);
            toast(
                {
                    title: "Product created"
                }
            )
            setIsDirty(false);
        } catch (error) {
            toast({description:"Error when trying to send request to server, please contact engineer team"})
            console.log(JSON.stringify(error));
        }
    };

    const {toast} = useToast();


    return (
        <div className="new-product-editor p-4 flex flex-col items-center">
            <div className={"w-full sm:w-2/3"}>
                <CategoryPicker categories={categories}
                                selectedCategories={pickedCategories}
                                handleRemoveCategory={handleRemoveCategory}
                                handleSelectCategory={handleSelectCategory}

                />
                <MainImagePicker
                    selectedImage={mainImage}
                    handleImagePick={handleMainImagePick}
                    imagePreviewUrl={mainImageUrl}
                />
                <OtherImagesPicker
                    handleImagesPick={handleOtherImagesPick}
                    selectedOtherImages={otherImages}
                    handleRemoveImage={handleOtherImagesRemove}
                    imagePreviewUrls={otherImageUrls}
                />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="price">Product Price</Label>
                        <Input id="price" type="number" step="0.01" value={price}
                               onChange={(e) => {
                                   setPrice(parseFloat(e.target.value))
                                   setIsDirty(true)
                               }} required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="stock">Product Stock</Label>
                        <Input id="stock" type="number" value={stock}
                               onChange={(e) => setStock(parseInt(e.target.value))}
                               required/>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Product Description</Label>
                        <ProductDescriptionEditor content={description} setContent={setDescription}/>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => console.log('Cancel')}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSave}>
                        Save
                    </Button>
                </div>


            </div>
            <div className="mt-8 mx-4">
                <h2 className="text-2xl font-bold mb-4">Product Preview</h2>
                <h4 className={"font-thin text-pretty text-muted-foreground"}>This is where your product page should be, the real data will only change after you click save</h4>
                <ProductDetails
                    name={name}
                    description={description}
                    mainImageUrl={mainImageUrl}
                    otherImageUrls={otherImageUrls}
                    mainImageAlt={"Main image alt"}
                    productPrice={price}
                    reviews={reviews}
                />
            </div>
        </div>
    );
};

export default ProductEditor;