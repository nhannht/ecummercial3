
import {Outlet, useNavigate} from "react-router-dom"

import AdminNavigationBar from "./AdminNavigationBar.tsx";
import useLocalStorageState from "use-local-storage-state";
import {useEffect} from "react";
import {emptyUser} from "@/lib/global.ts";

export default function AdminApp() {

    const [user,_getUser] = useLocalStorageState('user', { defaultValue: emptyUser})
    const navigate = useNavigate()

    useEffect(()=>{
        if (user.Role.trim() === "admin"){
            return
        }
        navigate("/login")


    },[user])


  return (
    <div >
        <AdminNavigationBar />
        <div>
            <Outlet/>
        </div>
      </div>
  )
}
