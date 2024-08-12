
import {Link} from "react-router-dom"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { SVGProps } from "react"
import { JSX } from "react/jsx-runtime"

export default function AboutUs() {
  return (
      <div className="flex flex-col min-h-[100dvh]">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link to="#" className="flex items-center justify-center">
            <MountainIcon className="h-6 w-6"/>
            <span className="sr-only">Acme Ecommerce</span>
          </Link>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      About Acme Ecommerce
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Acme Ecommerce is a leading online marketplace that connects buyers and sellers from around the
                      world. Our mission is to empower entrepreneurs and small businesses to reach a global audience and
                      grow their operations.
                    </p>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      We believe in the power of technology to transform the way people shop and do business. Our
                      platform
                      is designed to be user-friendly, secure, and scalable, providing our customers with a seamless and
                      reliable experience.
                    </p>
                  </div>
                </div>
                <img
                    src="/placeholder.svg"
                    width="550"
                    height="550"
                    alt="About Us"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                />
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <img
                    src="/placeholder.svg"
                    width="550"
                    height="310"
                    alt="History"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our History</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Acme Ecommerce was founded in 2015 by a team of passionate entrepreneurs who saw the potential of
                      e-commerce to transform the way people shop and do business. Since then, we've grown to become one
                      of the leading online marketplaces, serving millions of customers and thousands of sellers around
                      the world.
                    </p>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Our commitment to innovation, customer service, and ethical business practices has been the
                      driving
                      force behind our success. We're proud to have built a platform that empowers entrepreneurs and
                      small
                      businesses to thrive in the digital economy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet Our Team</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      At the heart of Acme Ecommerce are our dedicated and talented team members. Our diverse group of
                      professionals bring a wealth of experience and expertise to the table, working tirelessly to
                      ensure
                      our platform delivers the best possible experience for our customers and sellers.
                    </p>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      From our engineers and designers to our customer support and operations teams, each member of the
                      Acme Ecommerce family is committed to our mission of empowering entrepreneurs and small
                      businesses.
                      We're proud to have built a culture of innovation, collaboration, and continuous improvement.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg"/>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="text-lg font-bold">John Doe</h3>
                      <p className="text-muted-foreground">CEO</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg"/>
                      <AvatarFallback>JA</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="text-lg font-bold">Jane Ahn</h3>
                      <p className="text-muted-foreground">CTO</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg"/>
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="text-lg font-bold">Sarah Miller</h3>
                      <p className="text-muted-foreground">Head of Marketing</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg"/>
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="text-lg font-bold">Robert Kim</h3>
                      <p className="text-muted-foreground">Head of Operations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Acme Ecommerce is designed to provide a seamless and reliable experience for both buyers and
                      sellers. Our platform offers a wide range of features to help our customers succeed, including:
                    </p>
                    <ul className="grid gap-2 py-4">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary"/>
                        Secure and reliable payment processing
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary"/>
                        Intuitive and user-friendly interface
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary"/>
                        Powerful analytics and reporting tools
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary"/>
                        Comprehensive seller tools and resources
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary"/>
                        Dedicated customer support team
                      </li>
                    </ul>
                  </div>
                </div>
                <img
                    src="/placeholder.svg"
                    width="550"
                    height="310"
                    alt="Features"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                />
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-muted-foreground">&copy; 2024 Acme Ecommerce. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link to="#" className="text-xs hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link to="#" className="text-xs hover:underline underline-offset-4">
              Privacy Policy
            </Link>
          </nav>
        </footer>
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


function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}