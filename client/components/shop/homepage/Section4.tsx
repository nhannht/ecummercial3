import {Link} from "react-router-dom";

export function Section4() {
    return <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Product Categories</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Browse our wide range of product categories to find what you're looking for.
                    </p>
                </div>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div
                    className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                    <Link to="#" className="absolute inset-0 z-10">
                        <span className="sr-only">View Category</span>
                    </Link>
                    <img
                        src="/placeholder.svg"
                        alt="Category 1"
                        width={500}
                        height={400}
                        className="object-cover w-full h-64"
                        style={{aspectRatio: "500/400", objectFit: "cover"}}
                    />
                    <div className="p-4 bg-background">
                        <h3 className="text-xl font-bold">Clothing</h3>
                        <p className="text-sm text-muted-foreground">Discover</p>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}