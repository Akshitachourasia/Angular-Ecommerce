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
  constructor( private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {

    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result
      console.log(result)
    })
  }

}
