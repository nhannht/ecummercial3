import {Outlet} from "react-router-dom";
import ShopNavigationBar from "./ShopNavigationBar";


function Shop() {

    return (
        <div>
            <ShopNavigationBar/>
            <Outlet/>
        </div>
    )
}

export default Shop
