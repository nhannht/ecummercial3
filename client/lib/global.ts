export type Category = {
    ID:string,
    CategoryName: string
}


export interface Review {
    ID?: number;
    UserID: number;
    ProductID: number;
    Rating: number;
    Comment: string;
    ReviewDate: string;
    User:User;
}

export interface User {
    ID?: number;
    Name: string;
    Email: string;
    Password: string;
    Addresses: string;
    Orders: Order[];
    Reviews: Review[];
    Role: string;
}

export interface OrderItem {
    ID?: number;
    ProductID?: number;
    Product?: Product;
    OrderID?: number;
    Order?: Order;
}

export interface Product {
    ID?: number;
    Name: string;
    Description: string;
    Price: number;
    Stock: number;
    Image: string;
    OtherImages: string[];
    Categories: Category[];
    Reviews: Review[];
    OrderItems: OrderItem[];
}

export interface ShippingInfo {
    ID?: number;
    Address: string;
    City: string;
    State: string;
    OrderId: number;
    Phone: string;
    Sex: string;
    Note: string;
}

export interface Payment {
    ID?: number;
    OrderID: number;
    PaymentDate: string;
    Amount: number;
    PaymentMethod: string;
    Status: string
}

export interface Order {
    ID?: number;
    updated_at?: string;
    UserID?: number;
    TotalCost?: number;
    OrderItems?: OrderItem[];
    Payments?: Payment[];
    Status?: 'pending' | 'shipped' | 'delivered';
    ShippingInfo?: ShippingInfo;
    User?: User;
}

export interface Cart {
    orderItems: OrderItem[];
}
export type UserLocalStorageData = {
    User:User
}

export type MenuLink = {
    title: string,
    href: string,
    description: string
}


 const emptyUser: User = {
    Addresses: "", Email: "", Name: "", Orders: [], Password: "", Reviews: [], Role: ""

}


 const emptyUserLocalData: UserLocalStorageData = {
    User: {
        Name: "",
        Email: "",
        Password: "",
        Addresses: "",
        Orders: [],
        Reviews: [],
        Role: ""
    },

}


export {emptyUserLocalData}
export {emptyUser}