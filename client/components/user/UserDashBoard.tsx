import {Outlet} from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function UserDashboard  () {
  return (
      <div className={"flex   "}>
        <NavigationBar />
        <div className={"p-4 w-full"}>
            <Outlet/>
        </div>
      </div>

  )
}

