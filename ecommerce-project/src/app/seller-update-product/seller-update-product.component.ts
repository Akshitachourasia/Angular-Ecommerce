import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Product } from '../data-types';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productMessage: string|undefined;
  constructor( private route: ActivatedRoute , private Product : ProductService) { }
  productData: Product | undefined
ngOnInit(): void {
  let productId = this.route.snapshot.paramMap.get('id')
  productId && this.Product.getProduct(productId).subscribe((data) => {
    this.productData = data
    console.log(data)
  })

}
submit(product: Product) {
  if (this.productData) {
    product.id = this.productData.id
    this.Product.updateProduct(product).subscribe((result) => {
      if (result) {
        this.productMessage = "Product updated successfully"
        console.log(result)
      }
    })
  }
  setTimeout(() => {
    this.productMessage = undefined
  }, 3000)
}

}
