import {Link} from "react-router-dom"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <img
                  src="/placeholder.svg"
                  width="800"
                  height="600"
                  alt="Featured Product"
                  className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover object-center"
                />
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                    Discover Our Featured Product
                  </h1>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Explore our latest and greatest product, designed with quality and style in mind.
                  </p>
                </div>
                <Link
                  to="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Products</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our curated selection of top-selling products across various categories.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                <Link to="#" className="absolute inset-0 z-10" >
                  <span className="sr-only">View Product</span>
                </Link>
                <img
                  src="/placeholder.svg"
                  alt="Product 1"
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4 bg-background">
                  <h3 className="text-xl font-bold">Classic Leather Shoes</h3>
                  <p className="text-sm text-muted-foreground">Elegant and comfortable</p>
                  <h4 className="text-lg font-semibold md:text-xl">$59.99</h4>
                </div>
              </div>
              <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                <Link to="#" className="absolute inset-0 z-10" >
                  <span className="sr-only">View Product</span>
                </Link>
                <img
                  src="/placeholder.svg"
                  alt="Product 2"
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4 bg-background">
                  <h3 className="text-xl font-bold">Designer Handbag</h3>
                  <p className="text-sm text-muted-foreground">Fashion statement</p>
                  <h4 className="text-lg font-semibold md:text-xl">$89.99</h4>
                </div>
              </div>
              <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                <Link to="#" className="absolute inset-0 z-10" >
                  <span className="sr-only">View Product</span>
                </Link>
                <img
                  src="/placeholder.svg"
                  alt="Product 3"
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4 bg-background">
                  <h3 className="text-xl font-bold">Wireless Earbuds</h3>
                  <p className="text-sm text-muted-foreground">Crystal clear audio</p>
                  <h4 className="text-lg font-semibold md:text-xl">$69.99</h4>
                </div>
              </div>
              <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                <Link to="#" className="absolute inset-0 z-10" >
                  <span className="sr-only">View Product</span>
                </Link>
                <img
                  src="/placeholder.svg"
                  alt="Product 4"
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4 bg-background">
                  <h3 className="text-xl font-bold">Vintage Pocket Watch</h3>
                  <p className="text-sm text-muted-foreground">Antique charm</p>
                  <h4 className="text-lg font-semibold md:text-xl">$79.99</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Current Promotions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out our latest promotions and discounts on selected products.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                <Link to="#" className="absolute inset-0 z-10" >
                  <span className="sr-only">View Promotion</span>
                </Link>
                <img
                  src="/placeholder.svg"
                  alt="Promotion 1"
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4 bg-background">
                  <h3 className="text-xl font-bold">Summer Sale</h3>
                  <p className="text-sm text-muted-foreground">Up to 50% off selected items</p>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold md:text-xl">
                      <span className="line-through text-muted-foreground">$99.99</span>
                      $49.99
                    </h4>
                    <Link
                      to="#"
                      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                <Link to="#" className="absolute inset-0 z-10" >
                  <span className="sr-only">View Promotion</span>
                </Link>
                <img
                  src="/placeholder.svg"
                  alt="Promotion 2"
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4 bg-background">
                  <h3 className="text-xl font-bold">Back to School</h3>
                  <p className="text-sm text-muted-foreground">20% off school supplies</p>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold md:text-xl">
                      <span className="line-through text-muted-foreground">$29.99</span>
                      $23.99
                    </h4>
                    <Link
                      to="#"
                      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                <Link to="#" className="absolute inset-0 z-10" >
                  <span className="sr-only">View Promotion</span>
                </Link>
                <img
                  src="/placeholder.svg"
                  alt="Promotion 3"
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4 bg-background">
                  <h3 className="text-xl font-bold">Holiday Deals</h3>
                  <p className="text-sm text-muted-foreground">30% off selected items</p>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold md:text-xl">
                      <span className="line-through text-muted-foreground">$79.99</span>
                      $55.99
                    </h4>
                    <Link
                      to="#"
                      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                <Link to="#" className="absolute inset-0 z-10" >
                  <span className="sr-only">View Promotion</span>
                </Link>
                <img
                  src="/placeholder.svg"
                  alt="Promotion 4"
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4 bg-background">
                  <h3 className="text-xl font-bold">Black Friday Sale</h3>
                  <p className="text-sm text-muted-foreground">40% off sitewide</p>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold md:text-xl">
                      <span className="line-through text-muted-foreground">$199.99</span>
                      $119.99
                    </h4>
                    <Link
                      to="#"
                      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
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
              <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                <Link to="#" className="absolute inset-0 z-10" >
                  <span className="sr-only">View Category</span>
                </Link>
                <img
                  src="/placeholder.svg"
                  alt="Category 1"
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4 bg-background">
                  <h3 className="text-xl font-bold">Clothing</h3>
                  <p className="text-sm text-muted-foreground">Discover</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}