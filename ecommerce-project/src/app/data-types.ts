export interface Signup {
    name: string;
    email: string;
    password: string;
}
export interface Login {
    email: string;
    password: string;
}
export interface Product {
    quantity: number | undefined;
    productId: string | undefined;
    _id: string;
    name: string;
    category: string;
    color: string;
    price: string;
    image: string;
    description: string;
}
export interface Cart {
    _id: string | undefined;
    quantity: number | undefined;
    productId: string | undefined;
    name: string;
    category: string;
    color: string;
    price: string;
    image: string;
    description: string;
    userId: string;
}
export interface Summary {
    amount: number;
    tax: number;
    delivery:number;
    discount:number;
    total: number;
}