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
