
import {emptyUser, MenuLink} from "@/lib/global.ts";
import {Menu} from "@/components/Menu.tsx";
import CartSymbol from "@/components/shop/navigation-bar/CartSymbol.tsx";
import {LogInButton} from "@/components/LogoutInButtons.tsx";
import {NavigationUserDropdown} from "@/components/NavigationUserDropdown.tsx";
import {PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";
import {NavigationMenuLink} from "@/components/ui/navigation-menu.tsx";
import useLocalStorageState from "use-local-storage-state";
const adminMenuLinks:MenuLink[] = [
    {
        title: "Products Management",
        href: "/admin/products",
        description: "Product list and management",
    },
    {
        title: "Orders Management",
        href: "/admin/orders",
        description: "Order list and management",

    },
    {
        title: "Users Management",
        href: "/admin/users",
        description:"user list and management",
    },
    {
        title: "Analytics",
        href: "/admin/analytics",
        description: "view analytics data",
    },
    {
        title: "Term of Service Editor",
        href:"/admin/toq-editor",
        description:"Edit term of service page"
    },
    {
        title: "Privacy Policy Editor",
        href:"/admin/pp-editor",
        description:"Edit privacy policy page"
    },
    {
        title:"FAQ Editor",
        href:"/admin/faq-editor",
        description:"Edit frequently asked questions page"
    }
]
function AdminNavigationBar() {
    const [user,_setUser] = useLocalStorageState("user", {defaultValue: emptyUser})


    return <div className={"flex items-center justify-between"}>
        <Menu
            shopLinks={adminMenuLinks}
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

}

export default AdminNavigationBar


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









