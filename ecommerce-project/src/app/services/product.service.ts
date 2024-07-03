import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

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
  }