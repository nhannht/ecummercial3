import "react-quill/dist/quill.snow.css";
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Card} from "@/components/ui/card"
import {StarIcon} from "lucide-react";
import {Category, Review} from "@/lib/global";
import {OtherImagesList} from "@/components/shop/product-editor/OtherImagesList.tsx";

function ReviewPlaceHolder() {
    return <div>
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
                        This backpack is amazing! It's durable, comfortable, and has plenty of
                        storage
                        space. Highly
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
                        I've been using this backpack for a few months now and it's held up really
                        well.
                        The quality is
                        top-notch.
                    </p>
                </div>
            </div>
        </div>
    </div>;
}

export default function ProductDetails(props: {
    name: string,
    description: string
    mainImageUrl: string,
    mainImageAlt: string,
    otherImageUrls: string[],
    productPrice?: number,
    reviews?: Review[],
    categories?: Category[],
}) {
    return (
        <div className="w-full max-w-6xl mx-auto py-12 md:py-20 px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="grid gap-6">
                    <img
                        src={props.mainImageUrl || "/placeholder.svg"}
                        alt={props.mainImageAlt || "a place holder for image picture"}
                        width={800}
                        height={600}
                        className="w-full rounded-lg object-cover aspect-[4/3]"
                    />
                    <div className="grid gap-2">
                        <h1 className="text-3xl md:text-4xl font-bold">{props.name}</h1>
                        <div
                            className="quill-content"
                            dangerouslySetInnerHTML={{__html: props.description}}
                        />


                    </div>
                </div>

                <div className="grid gap-6">
                    <OtherImagesList otherImagesUrls={props.otherImageUrls} callbackfn={(url, index) => (
                        <button
                            key={index}
                            className="border rounded-lg overflow-hidden transition-colors hover:border-primary"
                        >
                            <img
                                src={url}
                                alt={`Product Image ${index + 1}`}
                                width={150}
                                height={150}
                                className="aspect-square object-cover"
                            />
                        </button>
                    )}/>
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold">{props.productPrice || "$99.99"}</span>
                            <Button size="lg">Add to Cart</Button>
                        </div>
                        {
                            props.reviews ?
                            (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                                    <div className="grid gap-6">
                                        {props.reviews.map((review) => (
                                            <div key={review.ID} className="flex gap-4">
                                                <Avatar className="w-10 h-10 border">
                                                    <AvatarImage src="/placeholder.svg" alt="nhannht"/>
                                                    <AvatarFallback>TN</AvatarFallback>
                                                </Avatar>
                                                <div className="grid gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold">{review.User.Name}</h3>
                                                        <div className="flex items-center gap-0.5">
                                                            <StarIcon className="w-5 h-5 fill-primary"/>
                                                            <StarIcon className="w-5 h-5 fill-primary"/>
                                                            <StarIcon className="w-5 h-5 fill-primary"/>
                                                            <StarIcon
                                                                className="w-5 h-5 fill-muted stroke-muted-foreground"/>
                                                            <StarIcon
                                                                className="w-5 h-5 fill-muted stroke-muted-foreground"/>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {review.Comment}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>

                            ) : (<ReviewPlaceHolder/>)
                        }
                    </div>
                </div>
            </div>
            <div className="mt-12 md:mt-20">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <Card className="group">
                        {/*<Link to="#" className="absolute inset-0 z-10" >*/}
                        {/*  <span className="sr-only">View Product</span>*/}
                        {/*</Link>*/}
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
                        {/*<Link to="#" className="absolute inset-0 z-10" >*/}
                        {/*  <span className="sr-only">View Product</span>*/}
                        {/*</Link>*/}
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
                        {/*<Link to="#" className="absolute inset-0 z-10" >*/}
                        {/*  <span className="sr-only">View Product</span>*/}
                        {/*</Link>*/}
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
                        {/*<Link to="#" className="absolute inset-0 z-10" >*/}
                        {/*  <span className="sr-only">View Product</span>*/}
                        {/*</Link>*/}
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



