import App from "./App";
import Shop from "./components/shop/Shop";
import AdminApp from "./components/admin/AdminApp";
import UserApp from "./components/user/UserApp.tsx";
import HomePage from "./components/shop/HomePage";
import ProductListingPage from "./components/shop/ProductList";
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
import AdminDashBoard from "./components/admin/AdminDashBoard.tsx";
import ProductEditor from "./components/admin/ProductEditor.tsx";
import EditSection1Config from "./components/admin/configuration-editors/Landing/Section1";
import TermsAndConditionsEditor from "./components/admin/configuration-editors/termandcondition/TermAndConditionEditor";
import ContactEditor from "./components/admin/configuration-editors/contact/ContactEditor";
import ProductDetailPage from "@/components/shop/ProductDetailPage.tsx";
import UserDashboard from "@/components/user/UserDashboard.tsx";
import FAQEditor from "@/components/admin/configuration-editors/faq/FAQEditor.tsx";
// import ProductDescriptionEditor from "@/components/admin/ProductDescriptionEditor.tsx";

export const shopRoutes: RouteObject[] = [
    {
        path: "",
        element: <div><HomePage/></div>
    },
    {
        path: "products",
        element: <div><ProductListingPage/></div>
    },
    {
        path: "products/:id",
        element: <div><ProductDetailPage/></div>
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
    {
        path: "login",
        element: <div><UserLoginPage/></div>
    },

]
const adminRoutes:RouteObject[] = [
    {
        path: "",
        element: <div><AdminDashBoard/></div>
    },
    {
        path:"dashboard",
        element: <div><AdminDashBoard/></div>

    },
    {
        path:"landing",
        element:<div></div>
    },
    {
      path:"products/new",
      element: <div><ProductEditor /></div>
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
        path:"products/edit/:id",
        element: <div><ProductEditor /></div>
    },
    {
        path:"config/homepage/section1",
        element: <div><EditSection1Config/></div>
    },
    {
        path:"toq-editor",
        element:<div><TermsAndConditionsEditor/></div>
    },
    {
        path:"contact-editor",
        element:<div><ContactEditor /></div>
    },
    {
        path:"faq-editor",
        element:<div><FAQEditor/></div>
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
        path: "profile",
        element: <div><UserProfilePage/></div>
    },
    {
        path: "order-history",
        element: <div><OrderHistoryPage/></div>
    },
    {
        path:"dashboard",
        element: <div><UserDashboard/></div>
    }

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
            element: <div><UserApp/></div>,
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
