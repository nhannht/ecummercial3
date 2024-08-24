import {MenuLink} from "@/lib/global.ts";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu.tsx";
import {MenuIcon} from "lucide-react";

export function Menu(props: {
    callbackfn: (link) => JSX.Element,
    shopLinks: MenuLink[]
}) {
    return <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger id={"home-hamburger-trigger"}><MenuIcon className="w-6 h-6"
                                                                               fill="currentColor"/></NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul id={"navigation-content"}
                        className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {props.shopLinks.map(props.callbackfn)}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>;
}