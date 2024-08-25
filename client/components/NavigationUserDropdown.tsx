
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Link} from "react-router-dom";
import {emptyUser, User} from "@/lib/global.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import useLocalStorageState from "use-local-storage-state";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Separator} from "@/components/ui/separator.tsx";

export function NavigationUserDropdown(props: { user: User }) {
    const {toast} = useToast()
    const [_user,setUser] = useLocalStorageState<User>(`user`, {defaultValue: emptyUser})
    const [_token,setToken] = useLocalStorageState<string>(`token`, {defaultValue: ""})


    return <Popover>
        <PopoverTrigger
            className={"translate-x-0 translate-y-0"}
            >
            <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg"/>
                    <AvatarFallback>Ad</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
            </Button>
        </PopoverTrigger>
        <PopoverContent align="end">
            <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg"/>
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5 leading-none">
                    <div className="font-semibold">{props.user.Name}</div>
                    <div className="text-sm text-muted-foreground">{props.user.Email}</div>
                </div>
            </div>
            {/*<DropdownMenuSeparator/>*/}
            <div>
                <Link to="/user/dashboard" className="flex items-center gap-2">
                    <div className="h-4 w-4"/>
                    <span>Dashboard</span>
                </Link>
            </div>
            <Separator/>
            <div>
                <div onClick={() => {
                    setUser(emptyUser)
                    setToken("")
                    toast({
                        description: "Logged out successfully",
                    })
                }}

                    className="flex items-center gap-2 hover:cursor-pointer">
                    <div className="h-4 w-4"/>
                    <span>Log out</span>
                </div>
            </div>
            {/*<Separator/>*/}

        </PopoverContent>
    </Popover>;
}