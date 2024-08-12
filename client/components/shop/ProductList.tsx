
import { useState, useMemo, SVGProps} from "react"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {JSX} from "react/jsx-runtime"

export default function ProductList() {
  const products = [
    {
      id: 1,
      image: "/placeholder.svg",
      name: "Wireless Headphones",
      price: 99.99,
      category: "Electronics",
      rating: 4.5,
    },
    {
      id: 2,
      image: "/placeholder.svg",
      name: "Leather Tote Bag",
      price: 79.99,
      category: "Bags",
      rating: 4.2,
    },
    {
      id: 3,
      image: "/placeholder.svg",
      name: "Outdoor Camping Gear",
      price: 149.99,
      category: "Sports",
      rating: 4.8,
    },
    {
      id: 4,
      image: "/placeholder.svg",
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      category: "Clothing",
      rating: 4.3,
    },
    {
      id: 5,
      image: "/placeholder.svg",
      name: "Smart Home Hub",
      price: 59.99,
      category: "Electronics",
      rating: 4.6,
    },
    {
      id: 6,
      image: "/placeholder.svg",
      name: "Hiking Backpack",
      price: 89.99,
      category: "Sports",
      rating: 4.7,
    },
  ]
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  // @ts-ignore
  const [priceRange, setPriceRange] = useState([0, 200])
  // @ts-ignore
  const [selectedRating, setSelectedRating] = useState(0)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const inCategory = selectedCategory.length === 0 || selectedCategory.includes(product.category)
      const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1]
      const hasRating = product.rating >= selectedRating
      return inCategory && inPriceRange && hasRating
    })
  }, [selectedCategory, priceRange, selectedRating])
  return (
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 p-6">
        <div className="bg-background rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="grid gap-4">
            <div>
              <h3 className="text-base font-medium mb-2">Category</h3>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2">
                  <Checkbox
                      checked={selectedCategory.includes("Electronics")}
                      onCheckedChange={() => {
                        setSelectedCategory((prev) =>
                            prev.includes("Electronics") ? prev.filter((c) => c !== "Electronics") : [...prev, "Electronics"],
                        )
                      }}
                  />
                  Electronics
                </Label>
                <Label className="flex items-center gap-2">
                  <Checkbox
                      checked={selectedCategory.includes("Bags")}
                      onCheckedChange={() => {
                        setSelectedCategory((prev) =>
                            prev.includes("Bags") ? prev.filter((c) => c !== "Bags") : [...prev, "Bags"],
                        )
                      }}
                  />
                  Bags
                </Label>
                <Label className="flex items-center gap-2">
                  <Checkbox
                      checked={selectedCategory.includes("Sports")}
                      onCheckedChange={() => {
                        setSelectedCategory((prev) =>
                            prev.includes("Sports") ? prev.filter((c) => c !== "Sports") : [...prev, "Sports"],
                        )
                      }}
                  />
                  Sports
                </Label>
                <Label className="flex items-center gap-2">
                  <Checkbox
                      checked={selectedCategory.includes("Clothing")}
                      onCheckedChange={() => {
                        setSelectedCategory((prev) =>
                            prev.includes("Clothing") ? prev.filter((c) => c !== "Clothing") : [...prev, "Clothing"],
                        )
                      }}
                  />
                  Clothing
                </Label>
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium mb-2">Price Range</h3>
              <div/>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium mb-2">Rating</h3>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2">
                  <div/>
                  Any
                </Label>
                <Label className="flex items-center gap-2">
                  <div/>
                  4 stars and above
                </Label>
                <Label className="flex items-center gap-2">
                  <div/>
                  3 stars and above
                </Label>
                <Label className="flex items-center gap-2">
                  <div/>
                  2 stars and above
                </Label>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
              <div key={product.id} className="bg-background rounded-lg shadow-sm overflow-hidden">
                <img
                    src="/placeholder.svg"
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                    style={{aspectRatio: "400/300", objectFit: "cover"}}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-5 h-5 fill-primary"/>
                      <StarIcon className="w-5 h-5 fill-primary"/>
                      <StarIcon className="w-5 h-5 fill-primary"/>
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground"/>
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground"/>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.rating})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">${product.price}</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  )
}

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}