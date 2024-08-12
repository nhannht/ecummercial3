import {Sheet, SheetContent, SheetTrigger} from "../ui/sheet";
import {Button} from "../ui/button";
import {
    HomeIcon,
    PackageIcon,
    PanelLeftIcon,
    SearchIcon,
    SettingsIcon,
    ShoppingCartIcon,
    UsersIcon
} from "lucide-react";
import {Link} from "react-router-dom";
import {Input} from "../ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";

export function DashBoardHeader() {
    return <header
        className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeftIcon className="h-5 w-5"/>
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">

                    <Link to="#" className="flex items-center gap-4 px-2.5 text-foreground">
                        <HomeIcon className="h-5 w-5"/>
                        Overview
                    </Link>
                    <Link
                        to="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"

                    >
                        <UsersIcon className="h-5 w-5"/>
                        Users
                    </Link>
                    <Link
                        to="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"

                    >
                        <PackageIcon className="h-5 w-5"/>
                        Products
                    </Link>
                    <Link
                        to="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"

                    >
                        <ShoppingCartIcon className="h-5 w-5"/>
                        Orders
                    </Link>
                    <Link
                        to="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"

                    >
                        <SettingsIcon className="h-5 w-5"/>
                        Settings
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>

        <div className="relative ml-auto flex-1 md:grow-0">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                    <img
                        src="/placeholder.svg"
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                        style={{aspectRatio: "36/36", objectFit: "cover"}}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </header>;
}