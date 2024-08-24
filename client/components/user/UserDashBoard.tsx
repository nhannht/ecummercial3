import {Outlet} from "react-router-dom";
import UserNavigationBar from "./UserNavigationBar.tsx";

export default function UserDashboard  () {
  return (
      <div>
        <UserNavigationBar />
        <div >
            <Outlet/>
        </div>
      </div>

  )
}

