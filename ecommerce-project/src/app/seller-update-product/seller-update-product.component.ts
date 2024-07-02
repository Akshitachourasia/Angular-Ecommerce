import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Product } from '../data-types';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
submit(product: Product) {
  console.log(product)
}
}
