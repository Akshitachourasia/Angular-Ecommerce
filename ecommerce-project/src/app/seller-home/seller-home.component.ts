import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from '../data-types';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  constructor(private http: HttpClient, private product: ProductService) { }

  productList:undefined|Product[]
  ngOnInit(): void {
    this.product.productList().subscribe((result) => {
      this.productList = result;
      console.log(this.productList);
    })
  }
}
