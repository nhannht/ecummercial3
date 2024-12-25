This is my personal project I start to work on 6 months ago. It aim to be a full-stact ecommercial system.

- Backend: Go-gin, Postgres
- Front end: Vite(react). 

You can still view the front end in https://ecummercial.pages.dev. The backend will not deploy anymore

This project almost done, but I decide to stop, because I want to switch the front end to react native.

Thank for the support of modern AI code generated tools. They really help to saved me some time for boring part.


- Old plant uml file
```plantuml
@startuml
!define RECTANGLE class

RECTANGLE App {
}

App --> Shop : "/"
App --> UserApp : "/user"
App --> AdminApp : "/admin"

RECTANGLE Shop {
    HomePage : "/"
    ProductListingPage : "/products"
    CheckoutPage : "/checkout"
    OrderConfirmationPage : "/order-confirmation"
    SearchResultsPage : "/search"
    ContactUsPage : "/contact-us"
    AboutUsPage : "/about-us"
    FAQPage : "/faq"
    TermsAndConditionsPage : "/terms-and-conditions"
    UserLoginPage : "/login"
}

RECTANGLE UserApp {
    OrderHistoryPage : "/user"
    UserRegistrationPage : "/user/register"
    UserProfilePage : "/user/profile"
    OrderHistoryPage : "/user/order-history"
}

RECTANGLE AdminApp {
    DashBoard : "/admin"
    ProductEditor : "/admin/products/new"
    ProductManagementPage : "/admin/products"
    OrderManagementPage : "/admin/orders"
    UserManagementPage : "/admin/users"
    ProductEditor : "/admin/products/edit/:id"
    EditSection1Config : "/admin/configuration/homepage/section1"
    TermsAndConditionsEditor : "/admin/configuration/termandcondition/main"
    ContactEditor : "/admin/configuration/contact/main"
}

@enduml

```


```plantuml


@startuml
!define RECTANGLE class

RECTANGLE App {
}

App --> Shop : "/"

RECTANGLE Shop {
    HomePage : "/"
    ProductListingPage : "/products"
    CheckoutPage : "/checkout"
    OrderConfirmationPage : "/order-confirmation"
    SearchResultsPage : "/search"
    ContactUsPage : "/contact-us"
    AboutUsPage : "/about-us"
    FAQPage : "/faq"
    TermsAndConditionsPage : "/terms-and-conditions"
    UserLoginPage : "/login"
}

App --> UserApp : "/user"

RECTANGLE UserApp {
    OrderHistoryPage : "/user"
    UserRegistrationPage : "/user/register"
    UserProfilePage : "/user/profile"
    OrderHistoryPage : "/user/order-history"
}

@enduml

```


```

```

```plantuml
@startuml
!define RECTANGLE class

RECTANGLE App {
}

App --> Shop : "/"

RECTANGLE Shop {
    HomePage : "/"
    ProductListingPage : "/products"
    CheckoutPage : "/checkout"
    OrderConfirmationPage : "/order-confirmation"
    SearchResultsPage : "/search"
    ContactUsPage : "/contact-us"
    AboutUsPage : "/about-us"
    FAQPage : "/faq"
    TermsAndConditionsPage : "/terms-and-conditions"
    UserLoginPage : "/login"
}

App --> UserApp : "/user"

RECTANGLE UserApp {
    OrderHistoryPage : "/user"
    UserRegistrationPage : "/user/register"
    UserProfilePage : "/user/profile"
    OrderHistoryPage : "/user/order-history"
}

@enduml
```
