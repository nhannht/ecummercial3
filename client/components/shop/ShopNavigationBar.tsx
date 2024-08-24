import {PropsWithChildren} from "react"
import {useNavigate,} from "react-router-dom"
import {

    NavigationMenuLink,

} from "@/components/ui/navigation-menu"

import CartSymbol from "@/components/shop/navigation-bar/CartSymbol.tsx";
import {Menu} from "@/components/Menu.tsx";
import {emptyUser, MenuLink, User} from "@/lib/global.ts";
import {NavigationUserDropdown} from "@/components/NavigationUserDropdown.tsx";
import {LogInButton} from "@/components/LogoutInButtons.tsx";
import useLocalStorageState from "use-local-storage-state";

const shopLinks: MenuLink[] = [
    {title: "Home", href: "/", description: "Go to the homepage"},
    {title: "Products", href: "/products", description: "Browse our product catalog"},
    {title: "Cart", href: "/cart", description: "View items in your cart"},
    {title: "Search", href: "/search", description: "Search for products"},
    {title: "Contact Us", href: "/contact-us", description: "Get in touch with us"},
    {title: "About Us", href: "/about-us", description: "Learn more about us"},
    {title: "FAQ", href: "/faq", description: "Frequently Asked Questions"},
    {title: "Terms and Conditions", href: "/terms-and-conditions", description: "Read our terms and conditions"},
]

export default function ShopNavigationBar() {
    const [user,_setUser] = useLocalStorageState<User>(`user`, {defaultValue: emptyUser})
    return (
        <div className={"flex items-center justify-between"}>
            <Menu
                shopLinks={shopLinks}
                callbackfn={(link) => (
                    <ListItem
                        key={link.title}
                        title={link.title}
                        to={link.href}
                    >
                        {link.description}
                    </ListItem>
                )}/>
            <div className={"flex items-center space-x-2"}>
                <CartSymbol/>
                {user.Name.trim() === "" ?
                    (<LogInButton/>) : (
                        <NavigationUserDropdown user={user}/>
                    )
                }
            </div>

        </div>
    )
}

const ListItem = (props: PropsWithChildren<{
    to: string,
    title: string,
}>) => {

    const navigate = useNavigate()

    return (
        <li>
            <NavigationMenuLink>
                <div
                    onClick={() => navigate(props.to)}
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