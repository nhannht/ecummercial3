import {useEffect, useState} from 'react';
import {CategoryData, ProductData} from "@/components/shop/shop";
import {useBlocker, useLocation, useParams} from "react-router-dom";
import {CategoryPicker} from "@/components/admin/product-editor/CategoryPicker.tsx";
import {MainImagePicker} from "@/components/admin/product-editor/MainImagePicker.tsx";
import {OtherImagesPicker} from "@/components/admin/product-editor/OtherImagesPicker.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import ProductDescriptionEditor from "@/components/admin/ProductDescriptionEditor.tsx";
import {Button} from "@/components/ui/button.tsx";
import ProductDetails from "@/components/shop/ProductDetails.tsx";


const ProductEditor = () => {
    const {id} = useParams(); // Get the route parameters
    const location = useLocation(); // Get the current path
    const isEditMode = location.pathname.includes('/edit');
    const [isDirty, setIsDirty] = useState(false); // Track unsaved changges

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState('');

    const [mainImage, setMainImage] = useState<File | null>(null);
    const [mainImageUrl, setMainImageUrl] = useState('');

    const [otherImages, setOtherImages] = useState<File[]>([]);
    const [otherImageUrls, setOtherImageUrls] = useState<string[]>([]);

    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [pickedCategories, setPickedCategories] = useState<CategoryData[]>([]);

    let blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            isDirty  &&
            currentLocation.pathname !== nextLocation.pathname
    );

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/categories`)
            .then(response => response.json())
            .then(data => setCategories(data.data))
            .catch(error => console.error('Error fetching categories:', error));

        if (isEditMode && id) {
            fetch(`${import.meta.env.VITE_SERVER_URL}/products/${id}`)
                .then(response => response.json())
                .then((product) => {
                    const productData: ProductData = product.data;
                    setName(productData.Name)
                    setPrice(productData.Price)
                    // setStock(product.stock);
                    setDescription(productData.Description);
                    // setMainImageUrl(product.mainImageUrl);
                    // setOtherImageUrls(product.otherImageUrls);
                    setPickedCategories(productData.Categories);
                    // console.log(product);
                    // console.log(product.Categories)

                }).catch(error => console.error('Error fetching product:', error));
        }

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isDirty) {
                event.preventDefault();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };

    }, [isEditMode, id, isDirty]);

    const handleSelectCategory = (currentID: string) => {
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

    const handleRemoveCategory = (categoryID: string) => {
        setPickedCategories((prev) => prev.filter((item) => item.ID !== categoryID));
        setIsDirty(true)
    }

    const handleSave = () => {
        // console.log("placeholder")
        // todo
        setIsDirty(false)
    }


    return (
        <div className="new-product-editor">
            {blocker.state === "blocked" ? (
                <div>
                    <p>Are you sure you want to leave?</p>
                    <button onClick={() => blocker.proceed()}>
                        Proceed
                    </button>
                    <button onClick={() => blocker.reset()}>
                        Cancel
                    </button>
                </div>
            ) : null}

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
                    <Input id="stock" type="number" value={stock} onChange={(e) => setStock(parseInt(e.target.value))}
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
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Product Preview</h2>
                <ProductDetails
                    name={name}
                    description={description}
                    mainImageUrl={mainImageUrl}
                    otherImageUrls={otherImageUrls}
                    mainImageAlt={"Main image alt"}
                    productPrice={price}
                />
            </div>
        </div>
    );
};

export default ProductEditor;