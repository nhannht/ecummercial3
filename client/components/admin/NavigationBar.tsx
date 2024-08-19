import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../ui/tooltip";
import {Link} from "react-router-dom"
import {
    HomeIcon,
    LineChartIcon, ListOrderedIcon,
    Package2Icon,
    PackageIcon,
    SettingsIcon,
    UsersIcon,
} from "lucide-react";
const routesData = [
    {
        label: "Products Management",
        to: "/admin/products",
        icon: <PackageIcon className="h-5 w-5"/>
    },
    {
        label: "Orders Management",
        to: "/admin/orders",
        icon: <ListOrderedIcon className="h-5 w-5"/>

    },
    {
        label: "Users Management",
        to: "/admin/users",
        icon: <UsersIcon className="h-5 w-5"/>
    },
    {
        label: "Analytics",
        to: "/admin/analytics",
        icon: <LineChartIcon className="h-5 w-5"/>
    }
]
function NavigationBar() {


    return <div>

        <aside
            className={`fixed inset-y-0 left-0 z-10 w-14 flex-col border-r bg-background hidden   sm:flex `}>
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
<TooltipProvider>
                        <Link
                            to="/"
                            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                        >
                            <Package2Icon className="h-4 w-4 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <HomeIcon className="h-5 w-5" />
                                    <span className="sr-only">Dashboard</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Dashboard</TooltipContent>
                        </Tooltip>
                        {routesData.map((route) => (
                            <Tooltip key={route.to}>
                                <TooltipTrigger asChild>
                                    <Link
                                        to={route.to}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    >
                                        {route.icon}
                                        <span className="sr-only">{route.label}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">{route.label}</TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>


            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"

                            >
                                <SettingsIcon className="h-5 w-5"/>
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    </div>

}

export default NavigationBar














