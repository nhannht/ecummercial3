import {PropsWithChildren } from "react"
import {useNavigate, } from "react-router-dom"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import {cn} from "../../lib/utils";

const shopLinks: { title: string; href: string; description: string }[] = [
    { title: "Home", href: "/", description: "Go to the homepage" },
    { title: "Products", href: "/products", description: "Browse our product catalog" },
    { title: "Cart", href: "/cart", description: "View items in your cart" },
    { title: "Search", href: "/search", description: "Search for products" },
    { title: "Contact Us", href: "/contact-us", description: "Get in touch with us" },
    { title: "About Us", href: "/about-us", description: "Learn more about us" },
    { title: "FAQ", href: "/faq", description: "Frequently Asked Questions" },
    { title: "Terms and Conditions", href: "/terms-and-conditions", description: "Read our terms and conditions" },
]

export default function ShopNavigationBar() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger id={"home-hamburger-trigger"}><HamburgerMenuIcon className="w-6 h-6" fill="currentColor" /></NavigationMenuTrigger>
                    <NavigationMenuContent >
                        <ul id={"navigation-content"} className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {shopLinks.map((link) => (
                                <ListItem
                                    key={link.title}
                                    title={link.title}
                                    to={link.href}
                                >
                                    {link.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = (props: PropsWithChildren<{
    to: string,
    title: string,
}>) => {

    const navigate = useNavigate()

    return (
        <li>
            <NavigationMenuLink >
                <div
                    onClick={()=> navigate(props.to)  }
                    className={"navLink block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"}
                >
                    <div className="text-sm font-medium leading-none">{props.title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {props.children}
                    </p>
                </div>
            </NavigationMenuLink>
        </li>
    )
}