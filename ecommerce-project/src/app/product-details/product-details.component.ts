import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from '../data-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: Product | undefined;
  productQuantity: number = 1;
  removeCart = false;

  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    const productId = this.activeRoute.snapshot.paramMap.get('productId');
    if (productId) {
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;
      });

      const cartData = localStorage.getItem('localCart');
      if (cartData) {
        const items: Product[] = JSON.parse(cartData);
        const itemInCart = items.find(item => item._id.toString() === productId);
        this.removeCart = !!itemInCart;
      }
    }
  }

  handleQuantity(value: string) {
    if (value === 'plus' && this.productQuantity < 20) {
      this.productQuantity++;
    } else if (value === 'min' && this.productQuantity > 1) {
      this.productQuantity--;
    }
  }

  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user)._id
        console.log(userId)
        let cartData: Cart = {
          ...this.productData,
          userId,
          productId: this.productData._id,
        }
        delete cartData._id
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            alert('product added')
          }
        })
      }
    }
  }

  removeToCart(productId: string) {
    this.product.removeFromCart(productId)
    this.removeCart = false

  }
}
