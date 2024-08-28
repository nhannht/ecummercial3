import {useEffect, useState} from "react";
import {Category, Product, ResultMetadata, SortChoice, SortOption} from "@/lib/global.ts";
import {Link, useSearchParams} from "react-router-dom";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {CategoryPicker} from "@/components/admin/product-editor/CategoryPicker.tsx";
import {SortSettingsComponent} from "@/components/admin/SortSettingsComponent.tsx";
import {PaginationComponent} from "@/components/PaginationComponent.tsx";
import {PencilIcon} from "lucide-react";

const sortChoices: SortChoice[] = [
    {
        ID: "newest_updated_at",
        orders: [{sortBy: "product.updated_at", sortOrder: "desc"}],
        description: "Most recently updated items"
    },
    {
        ID: "cheapest_price",
        orders: [{sortBy: "Price", sortOrder: "asc"}],
        description: "From cheapest to most expensive"

    },
    {
        ID: "most_expensive_price",
        orders: [{sortBy: "Price", sortOrder: "desc"}],
        description: "From most expensive to cheapest"
    }
]


export default function ProductManagement() {
    const [products, setProducts] = useState<Product[] | undefined>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    // const [priceRange, _setPriceRange] = useState([0, 1]);
    const [sorts, setSorts] = useState<SortOption[]>([
        {sortBy: "products.updated_at", sortOrder: "desc"},


    ]);

    // const [priceMax, setPriceMax] = useState(0);
    // const [priceMin, setPriceMin] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    // const navigate = useNavigate();
    const [resultMetaData, setResultMetaData] = useState<ResultMetadata>({
        totalCount: products?.length || 0,
        currentPage: parseInt(searchParams.get("page") || "1"),
        pageSize: 10
    })


    // const {toast} = useToast();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/products?${searchParams.toString()}&preload=Categories`)
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
        console.log("sorts updated")
        searchParams.delete("sortBy");
        searchParams.delete("sortOrder");
        sorts.forEach(sorts => {
            searchParams.append("sortBy", sorts.sortBy);
            searchParams.append("sortOrder", sorts.sortOrder);
        })
        setSearchParams(searchParams)


    }, [sorts])


    // const filteredProducts = useMemo(() => {
    //   return products.filter((product) => {
    //     // let inCategory = selectedCategory.length === 0 || product.Categories.some(category => selectedCategory.includes(category.CategoryName));
    //     return product.Price >= priceRange[0] && product.Price <= priceRange[1];
    //   });
    // }, [priceRange, products]);

    const handleSelectCategory = (currentID: number) => {
        setSelectedCategory((prev) => {
                const category = categories.find(category => category.ID === currentID);
                return category ?
                    (prev.some(cat => cat.ID === currentID) ? prev.filter(cat => cat.ID !== currentID) : [...prev, category])
                    : prev;
            }
        );

    }
    const handleRemoveCategory = (categoryID: number) => {
        setSelectedCategory((prev) => prev.filter((item) => item.ID !== categoryID));
    }

    useEffect(() => {
        const newSelectedCat = selectedCategory.map(cat => cat.CategoryName);

        // Update searchParams with the selected categories
        searchParams.delete("categories");
        newSelectedCat.forEach(catName => {
            searchParams.append("categories", catName);
        });
        setSearchParams(searchParams);
    }, [selectedCategory])


    return (
        <div className="flex flex-col gap-4 p-4 sm:p-6">
            <div className={"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end"}>
                <CategoryPicker categories={categories}
                                selectedCategories={selectedCategory}
                                handleSelectCategory={handleSelectCategory}
                                handleRemoveCategory={handleRemoveCategory}/>
                <SortSettingsComponent
                    choices={sortChoices}
                    handleSort={setSorts}/>

            </div>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px] sm:w-[100px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden sm:table-cell">Price</TableHead>
                            <TableHead className="hidden md:table-cell">Category</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products && products.map((product) => (
                            <TableRow key={product.ID}>
                                <TableCell>
                                    <img
                                        src={product.Image}
                                        width="64"
                                        height="64"
                                        alt={product.Name}
                                        className="aspect-square rounded-md object-cover"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{product.Name}</TableCell>

                                <TableCell className="hidden sm:table-cell">${product.Price?.toFixed(2)}</TableCell>
                                <TableCell
                                    className="hidden md:table-cell">{product.Categories?.map(category => category.CategoryName).join(', ')}</TableCell>
                                <TableCell
                                    className="hidden md:table-cell">{new Date(product.UpdatedAt).toLocaleDateString()}</TableCell>
                                <TableCell className={"table-cell"}>
                                    <Link className={"table-cell"} to={`/admin/products/edit/${product.ID}`}>
                                        <PencilIcon/>
                                    </Link>
                                </TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <PaginationComponent searchParams={searchParams}
                                 setSearchParams={setSearchParams}
                                 resultMetaData={resultMetaData}

            />


        </div>


    )


}