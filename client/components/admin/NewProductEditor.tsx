//@ts-nocheck
import  {useEffect, useState} from 'react';
import ProductDescriptionEditor from './ProductDescriptionEditor';
import {Input} from '../ui/input';
import {Label} from '../ui/label';
import {Button} from '../ui/button';
import ProductDetails from "../shop/ProductDetails";
import {createCategory, fetchCategories} from "@/lib/handler.ts";
import {Select} from "../ui/select";



const NewProductEditor = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            const categories = await fetchCategories();
            console.log(categories);
            setCategoryOptions(categories.map(cat => ({ value: cat.id, label: cat.category_name })));
        };
        loadCategories();
    }, []);

    const handleCreateCategory = async (inputValue) => {
        setIsLoading(true);
        const newCategory = await createCategory(inputValue);
        if (newCategory) {
            const newOption = { value: newCategory.id, label: newCategory.category_name };
            setCategoryOptions([...categoryOptions, newOption]);
            setCategories([...categories, newOption]);
        }
        setIsLoading(false);
    };

    const handleSave = () => {
        const productData = {
            name,
            price,
            stock,
            categories: categories.split(',').map(cat => cat.trim()), // Convert comma-separated string to array
            description
        };
        console.log('Product data:', productData);
        // Add logic to save the product data, e.g., call an API
    };

    return (
        <div className="new-product-editor">
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="price">Product Price</Label>
                    <Input id="price" type="number" step="0.01" value={price}
                           onChange={(e) => setPrice(parseFloat(e.target.value))} required/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="stock">Product Stock</Label>
                    <Input id="stock" type="number" value={stock} onChange={(e) => setStock(parseInt(e.target.value))}
                           required/>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="categories">Product Categories</Label>
                    <Select
                        isMulti
                        value={categories}
                        onChange={setCategories}
                        options={categoryOptions}
                        isLoading={isLoading}
                        onCreateOption={handleCreateCategory}
                        placeholder="Select or create categories"
                    />
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
                />
            </div>
        </div>
    );
};

export default NewProductEditor;