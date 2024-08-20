// import {Section4} from "./homepage/Section4";
// import {Section3} from "./homepage/Section3";
import {Section2} from "./homepage/Section2";
import {Section1} from "./homepage/Section1";
import {useEffect, useState} from "react";

type Section1Data = {
    description: string,
    image: string,
    buttonText: string,
    link: string,
    heading: string
}
export default function HomePage() {
    const [section1Data, setSection1Data] = useState<Section1Data>({
        buttonText: "",
        description: "",
        heading: "",
        image: "",
        link: "",
    })
    useEffect(() => {
        fetch('http://localhost:8080/configuration/homepage/section1').then(r => {
                if (r.ok) {
                    return r.json()
                } else {
                    throw new Error('Failed to fetch section 1 data')
                }
            }
        ).then(data => setSection1Data(data))
            .catch(error => console.error('Error:', error))

    }, [])

    useEffect(() => {
        window.addEventListener(
            "scroll",
            () => {
                document.body.style.setProperty(
                    "--scroll",
                    // @ts-ignore
                    window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
                );
            },
            false
        );
    }, [])

    return (
        <div className="flex flex-col min-h-dvh">
            <div>
                {/*<div className={"h-[300vh]"}>*/}
                {/*    <div className={"sticky top-[5vh]"}>*/}
                {/*        <img*/}
                {/*            // src={"http://localhost:8080/images/others/" + props.image}*/}
                {/*            src={"Asset 1.svg"}*/}
                {/*            id={"flower-one"}*/}

                {/*            alt="Featured Product"*/}
                {/*            className="mx-auto w-1/2*/}
                {/*          aspect-square overflow-hidden rounded-xl object-cover object-center"*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <main className="flex-1">
                <Section1
                    link={section1Data.link}
                    image={section1Data.image}
                    buttonText={section1Data.buttonText}
                    description={section1Data.description}
                    heading={section1Data.heading}

                />
                <Section2/>
                {/*<Section3/>*/}
                {/*<Section4/>*/}
            </main>
        </div>
    )
}