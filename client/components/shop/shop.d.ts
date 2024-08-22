export type Category = {
    ID:string,
    CategoryName: string
}


export interface Review {
    ID: number;
    UserID: number;
    ProductID: number;
    Rating: number;
    Comment: string;
    ReviewDate: string;
    User:User;
}

export interface User {
    ID: number;
    Name: string;
    Email: string;
    Password: string;
    Addresses: string;
    Orders: Order[];
    Reviews: Review[];
    Role: string;
}

export interface OrderItem {
    Id: number;
    ProductID: number;
    Quantity: number;
    Price: number;
}

export interface Product {
    ID: number;
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
    ID: number;
    Street: string;
    Province: string;
    OrderId: number;
    Phone: string;
    Identify: string;
    Note: string;
}