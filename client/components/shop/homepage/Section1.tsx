import {Link} from "react-router-dom";

export function Section1(props: {
    heading: string,
    description: string,
    image: string,
    buttonText: string,
    link: string
}) {


    return <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                <div>
                    <img
                        // src={"http://localhost:8080/images/others/" + props.image}
                        src={"Asset 1.svg"}

                        alt="Featured Product"
                        className="mx-auto
                         duration-1000 aspect-square overflow-hidden rounded-xl object-cover object-center"
                    />
                </div>
                <div className="flex flex-col items-start space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                            {props.heading}
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            {props.description}
                        </p>
                    </div>
                    <Link
                        to={props.link}
                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

                    >
                        {props.buttonText}
                    </Link>
                </div>
            </div>
        </div>
    </section>;
}