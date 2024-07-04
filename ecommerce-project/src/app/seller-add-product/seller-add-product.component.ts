import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  constructor(private product: ProductService) { }
addProductMessage: string | undefined
  submit(data: Product) {
    this.product.addProduct(data).subscribe((result) => {
      if (result) {
       this.addProductMessage = "Product added successfully"
      }
      setTimeout(() => {
        this.addProductMessage = undefined
      }, 3000)
    })
  }
}
