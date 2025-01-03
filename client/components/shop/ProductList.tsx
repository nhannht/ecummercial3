import {useEffect, useMemo, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import {Button} from "@/components/ui/button";
import {Category, Product, ResultMetadata} from "@/lib/global";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {TwoThumpSlider} from "@/components/ui/slider.tsx";
import {PaginationComponent} from "@/components/PaginationComponent.tsx";
// import {useToast} from "@/components/ui/use-toast.ts";
// import useLocalStorageState from "use-local-storage-state";

interface CheckboxFilterProps {
    items: string[];
    selectedItems: string[];
    onChange: (item: string) => void;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({items, selectedItems, onChange}) => {

    return (
        <div className="grid gap-2">
            {items.map(item => (
                <Label key={item} className="flex items-center gap-2">
                    <Checkbox
                        checked={selectedItems.includes(item)}
                        onCheckedChange={() => onChange(item)}
                    />
                    {item}
                </Label>
            ))}
        </div>
    );
};

function ProductImage(props: { product: Product }) {
    return <img
        src="/placeholder.svg"
        alt={props.product.Name}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
        style={{aspectRatio: "400/300", objectFit: "cover"}}
    />;
}

function PrductCard(props: { product: Product }) {
    return (
        <Link to={`${props.product.ID}`}>
            <div className="bg-background rounded-lg shadow-sm overflow-hidden">
                <ProductImage product={props.product}/>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{props.product.Name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                        {/*<div className="flex items-center gap-0.5">*/}
                        {/*    {Array.from({ length: 5 }, (_, index) => (*/}
                        {/*        <StarIcon*/}
                        {/*            key={index}*/}
                        {/*            className={`w-5 h-5 ${index < product.rating ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`}*/}
                        {/*        />*/}
                        {/*    ))}*/}
                        {/*</div>*/}
                        {/*<span className="text-sm text-muted-foreground">({product.rating})</span>*/}
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">${props.product.Price}</span>

                    </div>
                </div>
            </div>
        </Link>
    )

}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [priceRange, setPriceRange] = useState([0, 1]);
    const [priceMax, setPriceMax] = useState(0);
    const [priceMin, setPriceMin] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    // const navigate = useNavigate();
    const [resultMetaData, setResultMetaData] = useState<ResultMetadata>({currentPage: 0, pageSize: 0, totalCount: 0})



    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/products?${searchParams.toString()}`)
            .then(response => response.json())
            .then(result => {
                // console.log(data)
                const {data, ...metaData} = result;
                setProducts(data)
                setResultMetaData(metaData)
                // console.log(metaData)
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [searchParams]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/categories`)
            .then(response => response.json())
            .then(data => setCategories(data.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/products/prices`)
            .then(response => response.json())
            .then(data => {
                const min = data.minPrice;
                const max = data.maxPrice;
                setPriceRange([min, max]);
                setPriceMax(max);
                setPriceMin(min);
            })
            .catch(error => console.error('Error fetching product prices:', error));
    }, []);

    const handleCategoryChange = (categoryName: string) => {
        const newSelectedCategory = selectedCategory.includes(categoryName)
            ? selectedCategory.filter(c => c !== categoryName)
            : [...selectedCategory, categoryName];
        setSelectedCategory(newSelectedCategory);
        // Clear existing categories
        searchParams.delete("categories");

        // Append each selected category
        newSelectedCategory.forEach(category => {
            searchParams.append("categories", category);
        });
        setSearchParams(searchParams);
    };

    const handleSortChange = (sortBy: string, sortOrder: string) => {
        searchParams.set("sortBy", sortBy);
        searchParams.set("sortOrder", sortOrder);
        setSearchParams(searchParams);
    };

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // let inCategory = selectedCategory.length === 0 || product.Categories.some(category => selectedCategory.includes(category.CategoryName));
            // @ts-ignore
            return product.Price >= priceRange[0] && product.Price <= priceRange[1];
        });
    }, [priceRange, products]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 p-6">
            <div className="bg-background rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <div className="grid gap-4">
                    <div>
                        <h3 className="text-base font-medium mb-2">Category</h3>
                        <CheckboxFilter
                            items={categories.map(category => category.CategoryName)}
                            selectedItems={selectedCategory}
                            onChange={handleCategoryChange}
                        />
                    </div>
                    <div>
                        <h3 className="text-base font-medium mb-2">Price Range</h3>
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <TwoThumpSlider
                                defaultValue={[0, 100]}
                                minStepsBetweenThumbs={1}
                                onValueChange={(value) => {
                                    let min = value[0];
                                    let max = value[1];
                                    if (max < min) {
                                        let t = min;
                                        min = max;
                                        max = t;
                                    }
                                    let trueValue = [priceMin + (priceMax - priceMin) * min / 100,
                                        priceMin + (priceMax - priceMin) * max / 100];
                                    setPriceRange(trueValue);
                                }}
                            />
                        </div>
                        <div className="flex justify-between w-full mt-2">
                            <span>${Math.round(priceRange[0])}</span>
                            <span>${Math.round(priceRange[1])}</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-base font-medium mb-2 w-full">Sort By</h3>
                        <div className="flex flex-col gap-2">
                            <Button onClick={() => handleSortChange("price", "asc")}>Price Asc</Button>
                            <Button onClick={() => handleSortChange("price", "desc")}>Price Desc</Button>
                            <Button onClick={() => handleSortChange("updated_at", "asc")}>Date Asc</Button>
                            <Button onClick={() => handleSortChange("updated_at", "desc")}>Date Desc</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {filteredProducts.map((product) => (
                    <PrductCard key={product.ID} product={product}/>
                ))}
            </div>
            <div className="flex flex-row w-[95vw]">
                <PaginationComponent searchParams={searchParams}
                                     setSearchParams={setSearchParams}
                                     resultMetaData={resultMetaData}
                />
            </div>

        </div>
    );
}