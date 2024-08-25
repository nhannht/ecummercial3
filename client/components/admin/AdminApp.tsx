
import { Outlet} from "react-router-dom"

import AdminNavigationBar from "./NavigationBar";

export default function AdminApp() {
  return (
    <div >
        <AdminNavigationBar />
        <div>
            <Outlet/>
        </div>
      </div>
  )
}
