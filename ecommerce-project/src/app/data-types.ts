export interface Signup{
    name: string;
    email: string;
    password: string;
}
export interface Login{
    email: string;
    password: string;
}
export interface Product{
    name: string;
    category: string;
    color: string;
    price: number;
    description: string;
    image: string;
}