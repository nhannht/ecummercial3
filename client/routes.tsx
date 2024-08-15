import App from "./App";
import Shop from "./components/shop/Shop";
import AdminApp from "./components/admin/AdminApp";
import UserDashboard from "./components/user/UserDashBoard";
import HomePage from "./components/shop/HomePage";
import ProductListingPage from "./components/shop/ProductList";
import CartPage from "./components/shop/Cart";
import CheckoutPage from "./components/shop/Checkout";
import OrderConfirmationPage from "./components/shop/OrderConfirmation";
import UserRegistrationPage from "./components/user/Signup";
import UserLoginPage from "./components/user/Login";
import UserProfilePage from "./components/user/UserProfile";
import OrderHistoryPage from "./components/user/UserOrderHistory";
import ProductManagementPage from "./components/admin/ProductManagement";
import OrderManagementPage from "./components/admin/OrderManagement";
import UserManagementPage from "./components/admin/UserManagement";
import SearchResultsPage from "./components/shop/SearchResults";
import ContactUsPage from "./components/shop/ContactUs";
import AboutUsPage from "./components/shop/AboutUs";
import FAQPage from "./components/shop/FAQ";
import TermsAndConditionsPage from "./components/shop/TermsAndConditions";
import {RouteObject} from "react-router-dom";
import DashBoard from "./components/admin/DashBoard";
import ProductDescriptionEditor from "./components/admin/ProductDescriptionEditor";
import NewProductEditor from "./components/admin/NewProductEditor";
import EditSection1Config from "./components/admin/configuration-editors/Landing/Section1";
import TermsAndConditionsEditor from "./components/admin/configuration-editors/termandcondition/TermAndConditionEditor";
import ContactEditor from "./components/admin/configuration-editors/contact/ContactEditor";

export const shopRoutes: RouteObject[] = [
    {
        path: "",
        element: <div><HomePage/></div>
    },
    {
        path: "products",
        element: <div><ProductListingPage/></div>
    },
    // {
    //     path: "products/:id",
    //     element: <div><ProductDetailPage/></div>
    // },

    {
        path: "cart",
        element: <div><CartPage/></div>
    },
    {
        path: "checkout",
        element: <div><CheckoutPage/></div>
    },
    {
        path: "order-confirmation",
        element: <div><OrderConfirmationPage/></div>
    },
    {
        path: "search",
        element: <div><SearchResultsPage/></div>
    },
    {
        path: "contact-us",
        element: <div><ContactUsPage/></div>
    },
    {
        path: "about-us",
        element: <div><AboutUsPage/></div>
    },
    {
        path: "faq",
        element: <div><FAQPage/></div>
    },
    {
        path: "terms-and-conditions",
        element: <div><TermsAndConditionsPage/></div>
    },

]
const adminRoutes:RouteObject[] = [
    {
        path: "",
        element: <div><DashBoard/></div>
    },
    {
        path:"landing",
        element:<div></div>
    },
    {
      path:"products/new",
      element: <div><NewProductEditor /></div>
    },
    {
        path: "products",
        element: <div><ProductManagementPage/></div>
    },
    {
        path: "orders",
        element: <div><OrderManagementPage/></div>
    },
    {
        path: "users",
        element: <div><UserManagementPage/></div>
    },
    {
        path:"product-editor",
        element: <div><ProductDescriptionEditor/></div>
    },
    {
        path:"configuration/homepage/section1",
        element: <div><EditSection1Config/></div>
    },
    {
        path:"configuration/termandcondition/main",
        element:<div><TermsAndConditionsEditor/></div>
    },
    {
        path:"configuration/contact/main",
        element:<div><ContactEditor /></div>
    }
];
const userRoutes = [
    {
        path: "",
        element: <div><OrderHistoryPage/></div>
    },
    {
        path: "register",
        element: <div><UserRegistrationPage/></div>
    },
    {
        path: "login",
        element: <div><UserLoginPage/></div>
    },
    {
        path: "profile",
        element: <div><UserProfilePage/></div>
    },
    {
        path: "order-history",
        element: <div><OrderHistoryPage/></div>
    },

];
export const routes: RouteObject[] = [{
    path: "/",
    element: <div><App/></div>,
    children: [
        {
            path: "",
            element: <div><Shop/></div>,
            children: shopRoutes
        },
        {
            path: "user",
            element: <div><UserDashboard/></div>,
            children: userRoutes
        },
        {
            path: "admin",
            element: <div><AdminApp/></div>,
            children: adminRoutes
        }
    ]
}
]
