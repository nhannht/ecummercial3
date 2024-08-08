
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import {Link} from  "react-router-dom"
import { SVGProps } from "react"
import { JSX } from "react/jsx-runtime"

export default function ProductDetails() {
  return (
      <div className="w-full max-w-6xl mx-auto py-12 md:py-20 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="grid gap-6">
            <img
                src="/placeholder.svg"
                alt="Product Hero"
                width={800}
                height={600}
                className="w-full rounded-lg object-cover aspect-[4/3]"
            />
            <div className="grid gap-2">
              <h1 className="text-3xl md:text-4xl font-bold">Premium Leather Backpack</h1>
              <p className="text-muted-foreground">
                Crafted with high-quality materials, this backpack is designed for everyday use and outdoor adventures.
              </p>
              <ul className="grid gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 text-primary"/>
                  Durable leather construction
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 text-primary"/>
                  Padded laptop compartment
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 text-primary"/>
                  Adjustable and comfortable straps
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 text-primary"/>
                  Multiple pockets for organization
                </li>
              </ul>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-4">
                <button className="border rounded-lg overflow-hidden transition-colors hover:border-primary">
                  <img
                      src="/placeholder.svg"
                      alt="Product Image 1"
                      width={150}
                      height={150}
                      className="aspect-square object-cover"
                  />
                </button>
                <button className="border rounded-lg overflow-hidden transition-colors hover:border-primary">
                  <img
                      src="/placeholder.svg"
                      alt="Product Image 2"
                      width={150}
                      height={150}
                      className="aspect-square object-cover"
                  />
                </button>
                <button className="border rounded-lg overflow-hidden transition-colors hover:border-primary">
                  <img
                      src="/placeholder.svg"
                      alt="Product Image 3"
                      width={150}
                      height={150}
                      className="aspect-square object-cover"
                  />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <button className="border rounded-lg overflow-hidden transition-colors hover:border-primary">
                  <img
                      src="/placeholder.svg"
                      alt="Product Image 4"
                      width={150}
                      height={150}
                      className="aspect-square object-cover"
                  />
                </button>
                <button className="border rounded-lg overflow-hidden transition-colors hover:border-primary">
                  <img
                      src="/placeholder.svg"
                      alt="Product Image 5"
                      width={150}
                      height={150}
                      className="aspect-square object-cover"
                  />
                </button>
                <button className="border rounded-lg overflow-hidden transition-colors hover:border-primary">
                  <img
                      src="/placeholder.svg"
                      alt="Product Image 6"
                      width={150}
                      height={150}
                      className="aspect-square object-cover"
                  />
                </button>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">$99.99</span>
                <Button size="lg">Add to Cart</Button>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                <div className="grid gap-6">
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn"/>
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">Sarah Johnson</h3>
                        <div className="flex items-center gap-0.5">
                          <StarIcon className="w-5 h-5 fill-primary"/>
                          <StarIcon className="w-5 h-5 fill-primary"/>
                          <StarIcon className="w-5 h-5 fill-primary"/>
                          <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground"/>
                          <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground"/>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This backpack is amazing! It's durable, comfortable, and has plenty of storage space. Highly
                        recommend.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn"/>
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">Alex Smith</h3>
                        <div className="flex items-center gap-0.5">
                          <StarIcon className="w-5 h-5 fill-primary"/>
                          <StarIcon className="w-5 h-5 fill-primary"/>
                          <StarIcon className="w-5 h-5 fill-primary"/>
                          <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground"/>
                          <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground"/>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        I've been using this backpack for a few months now and it's held up really well. The quality is
                        top-notch.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Card className="group">
              <Link to="#" className="absolute inset-0 z-10" >
                <span className="sr-only">View Product</span>
              </Link>
              <img
                  src="/placeholder.svg"
                  alt="Related Product 1"
                  width={300}
                  height={300}
                  className="w-full rounded-lg object-cover aspect-square group-hover:opacity-80 transition-opacity"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Leather Tote Bag</h3>
                <p className="text-muted-foreground text-sm">$79.99</p>
              </div>
            </Card>
            <Card className="group">
              <Link to="#" className="absolute inset-0 z-10" >
                <span className="sr-only">View Product</span>
              </Link>
              <img
                  src="/placeholder.svg"
                  alt="Related Product 2"
                  width={300}
                  height={300}
                  className="w-full rounded-lg object-cover aspect-square group-hover:opacity-80 transition-opacity"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Canvas Messenger Bag</h3>
                <p className="text-muted-foreground text-sm">$59.99</p>
              </div>
            </Card>
            <Card className="group">
              <Link to="#" className="absolute inset-0 z-10" >
                <span className="sr-only">View Product</span>
              </Link>
              <img
                  src="/placeholder.svg"
                  alt="Related Product 3"
                  width={300}
                  height={300}
                  className="w-full rounded-lg object-cover aspect-square group-hover:opacity-80 transition-opacity"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Nylon Backpack</h3>
                <p className="text-muted-foreground text-sm">$49.99</p>
              </div>
            </Card>
            <Card className="group">
              <Link to="#" className="absolute inset-0 z-10" >
                <span className="sr-only">View Product</span>
              </Link>
              <img
                  src="/placeholder.svg"
                  alt="Related Product 4"
                  width={300}
                  height={300}
                  className="w-full rounded-lg object-cover aspect-square group-hover:opacity-80 transition-opacity"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Waterproof Backpack</h3>
                <p className="text-muted-foreground text-sm">$89.99</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
  )
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
        <path d="M20 6 9 17l-5-5"/>
      </svg>
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