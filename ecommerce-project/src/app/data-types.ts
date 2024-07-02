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
    id: string;
    name: string;
    category: string;
    color: string;
    price: number;
    image: string;
    description: string;
}