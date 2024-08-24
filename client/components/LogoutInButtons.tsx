import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import useLocalStorageState from "use-local-storage-state";
import {emptyUser} from "@/lib/global.ts";
import {User} from "@/lib/global";

export function LogInButton() {
    return <Link
        to="/user/login"
        className="inline-flex h-9
                     items-center
                      justify-center
                       rounded-md
                        bg-primary
                         px-4 py-2
                         text-sm font-medium
                         text-primary-foreground
                         shadow transition-colors
                         hover:bg-primary/90 focus-visible:outline-none
                          focus-visible:ring-1 focus-visible:ring-ring
                          disabled:pointer-events-none disabled:opacity-50"
    >
        Login
    </Link>;
}

export function LogoutButton() {
    const [,setToken] = useLocalStorageState<string>("token",{
        defaultValue:""
    })
    const [,setUserData] = useLocalStorageState<User>("user",{
        defaultValue:emptyUser
    })

    const handleLogout = () => {
        setToken("")
        setUserData(emptyUser)
    }

    return <Button
        onClick={handleLogout}


        className="inline-flex h-9
                     items-center
                      justify-center
                       rounded-md
                        bg-primary
                         px-4 py-2
                         text-sm font-medium
                         text-primary-foreground
                         shadow transition-colors
                         hover:bg-primary/90 focus-visible:outline-none
                          focus-visible:ring-1 focus-visible:ring-ring
                          disabled:pointer-events-none disabled:opacity-50"
    >
        Logout
    </Button>;
}