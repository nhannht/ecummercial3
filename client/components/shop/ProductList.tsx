import {useEffect, useMemo, useState} from "react"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
// import {StarIcon} from "lucide-react";
import {TwoThumpSlider} from "@/components/ui/slider.tsx";
import {CategoryData, ProductData} from "@/components/shop/shop";

export default function ProductList() {
    const [products, setProducts] = useState<ProductData[]>([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/products`)
            .then(response => response.json())
            .then(data => setProducts(data.data))
            .catch(error => console.error('Error fetching products:', error))
    }, [])


    const [selectedCategory, setSelectedCategory] = useState<string[]>([])
    const [categories,setCategories] = useState<CategoryData[]>([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/categories`)
            .then(response => response.json())
            .then(data => {
                setCategories(data.data)
            })
            .catch(error => console.error('Error fetching products:', error))
    }, [])
    // @ts-ignore
    const [priceRange, setPriceRange] = useState([0, 1])
    const [priceMax,setPriceMax] = useState(0)
    const [priceMin, setPriceMin] = useState(0)
    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/products/prices`)
            .then(response => response.json())
            .then(data => {
                const min = data.minPrice
                const max = data.maxPrice
                setPriceRange([min,max])
                setPriceMax(max)
                setPriceMin(min)
            })
            .catch(error => console.error('Error fetching products:', error))
    }, [])
    // @ts-ignore
    // const [selectedRating, setSelectedRating] = useState(0)
    const filteredProducts = useMemo(() => {
        // console.log(selectedRating)
        return products.filter((product) => {
            let inCategory = selectedCategory.length === 0 || product.Categories.some(category => selectedCategory.includes(category.CategoryName))
            let inPriceRange = product.Price >= priceRange[0] && product.Price <= priceRange[1]
            // let hasRating = product.rating >= selectedRating

            return inCategory && inPriceRange
        })
    }, [selectedCategory, priceRange,products,categories])
    return (
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 p-6">
            <div className="bg-background rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <div className="grid gap-4">
                    <div>
                        <h3 className="text-base font-medium mb-2">Category</h3>
                        <div className="grid gap-2">
                            {categories.map(category => (
                                <Label key={category.ID} className="flex items-center gap-2">
                                <Checkbox
                                    checked={selectedCategory.includes("Electronics")}
                                    onCheckedChange={() => {
                                        setSelectedCategory((prev) =>
                                            prev.includes(category.CategoryName) ? prev.filter((c) => c !== category.CategoryName) : [...prev, category.CategoryName],
                                        )
                                    }}
                                />
                                    {category.CategoryName}
                            </Label>
                            ))}



                        </div>
                    </div>
                    <div>
                        <h3 className="text-base font-medium mb-2">Price Range</h3>
                        <div/>
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <TwoThumpSlider
                                defaultValue={[0,100]}

                                minStepsBetweenThumbs={1}
                                onValueChange={(value) => {
                                    let min = value[0]
                                    let max = value[1]
                                    if (max < min) {
                                        let t = min
                                        min = max
                                        max = t
                                    }
                                    let trueValue = [ priceMin+(priceMax - priceMin) * min /100,
                                        priceMin + (priceMax - priceMin) * max /100]
                                    setPriceRange(trueValue)
                                }}
                            />
                        </div>
                        <div className="flex justify-between w-full mt-2">
                            <span>${Math.round(priceRange[0])}</span>
                            <span>${Math.round(priceRange[1])}</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-base font-medium mb-2">Rating</h3>
                        <RadioGroup defaultValue="0"
                                    // onValueChange={(value) => setSelectedRating(Number(value))}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="0" id="any"/>
                                <Label htmlFor="any">Any</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="4" id="four-stars"/>
                                <Label htmlFor="four-stars">4 stars and above</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="3" id="three-stars"/>
                                <Label htmlFor="three-stars">3 stars and above</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="2" id="two-stars"/>
                                <Label htmlFor="two-stars">2 stars and above</Label>
                            </div>
                        </RadioGroup>

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.ID} className="bg-background rounded-lg shadow-sm overflow-hidden">
                        <img
                            src="/placeholder.svg"
                            alt={product.Name}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover"
                            style={{aspectRatio: "400/300", objectFit: "cover"}}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{product.Name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                                {/*<div className="flex items-center gap-0.5">*/}
                                {/*    {Array.from({length: 5}, (_, index) => (*/}
                                {/*        <StarIcon*/}
                                {/*            key={index}*/}
                                {/*            className={`w-5 h-5 ${index < product.rating ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`}*/}
                                {/*        />*/}
                                {/*    ))}*/}
                                {/*</div>*/}
                                {/*<span className="text-sm text-muted-foreground">({product.rating})</span>*/}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">${product.Price}</span>
                                <Button size="sm">Add to Cart</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

