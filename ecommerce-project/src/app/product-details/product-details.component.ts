import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productData: undefined | Product
  productQuantity: number = 1
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {

    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result
      // console.log(result)
    })
  }
  handleQuantity(value: string) {
    if (this.productQuantity < 20 && value === 'plus') {
      this.productQuantity += 1
    }
    else if (this.productQuantity > 1 && value === 'min') {
      this.productQuantity -= 1
    }

  }
}