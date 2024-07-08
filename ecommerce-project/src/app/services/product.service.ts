import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  cartData = new EventEmitter<Product[] | []>();

  addProduct(data: Product) {
    return this.http.post('http://localhost:4545/products', data)
  }
  productList() {
    return this.http.get<Product[]>('http://localhost:4545/products')
  }
  deleteProduct(_id: string) {
    return this.http.delete(`http://localhost:4545/products/${_id}`)
  }
  getProduct(_id: string) {
    return this.http.get<Product>(`http://localhost:4545/products/${_id}`)
  }
  updateProduct(product: Product) {
    return this.http.put(`http://localhost:4545/products/${product._id}`, product)
  }
  popularProducts() {
    return this.http.get<Product[]>('http://localhost:4545/products?limit=3')
  }
  trendyProducts() {
    return this.http.get<Product[]>('http://localhost:4545/products?limit=5')
  }
  searchProduct(query: string) {
    return this.http.get<Product[]>(`http://localhost:4545/products?q=${query}`
    );
  }
  localAddToCart(data: Product) {
    let cartData = []
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
    } else {
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
      this.cartData.emit(cartData)
    }
  }
  removeFromCart(productId:string) {
    let cartData = localStorage.getItem('localCart')
   if(cartData){
    let items: Product[] = JSON.parse(cartData);
    items = items.filter((item:Product)=>productId !== item._id);
    console.log(items, "Remaining items")
    setTimeout(() => {
      localStorage.setItem('localCart', JSON.stringify(items))
      
  }, 2000);
  this.cartData.emit(items)
   }
   
  }
}