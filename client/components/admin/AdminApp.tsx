
import { Outlet} from "react-router-dom"

import NavigationBar from "./NavigationBar";

export default function AdminApp() {
  return (
    <div className={"flex"}>
        <NavigationBar />
        <div className={"sm:pl-24 pr-10 w-full"}>
            <Outlet/>
        </div>
      </div>
  )
}
