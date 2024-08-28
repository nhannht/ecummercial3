import {Outlet, useNavigate} from "react-router-dom";
import UserNavigationBar from "./UserNavigationBar.tsx";
import useLocalStorageState from "use-local-storage-state";
import {emptyUser} from "@/lib/global.ts";
import {useEffect} from "react";

export default function UserApp() {
    const [user, _getUser] = useLocalStorageState('user', {defaultValue: emptyUser})
    const navigate = useNavigate()

    useEffect(() => {
        if (user.Role.trim() !== "user") {

            navigate("/login")
        }


    }, [user])
    return (
        <div>
            <UserNavigationBar/>
            <div>
                <Outlet/>
            </div>
        </div>

    )
}

