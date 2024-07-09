import { Component } from '@angular/core';
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
export class ProductDetailsComponent {
  productData: Product | undefined;
  productQuantity: number = 1;
  removeCart = false;
  cartData: Product | undefined;
  constructor(private activeRoute: ActivatedRoute, private Product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.Product.getProduct(productId).subscribe((result) => {
      this.productData = result;
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Product) => productId === item._id.toString());
        if (items.length) {
          this.removeCart = true
        } else {
          this.removeCart = false
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user)._id;
        this.Product.getCart(userId);
        this.Product.cartData.subscribe((result) => {
          let item = result.filter((item: Product) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }
    })
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
        this.Product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user)._id
        let cartData: Cart = {
          ...this.productData,
          userId,
          productId: this.productData._id,
        }
        delete cartData._id
        this.Product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.Product.getCart(userId)
            this.removeCart = true
          }
        })
      }


    }
  }

  removeToCart(productId: string) {
    if (!localStorage.getItem('user')) {
      this.Product.removeFromCart(productId)
    } else {
      let user= localStorage.getItem('user')
      let userId = user && JSON.parse(user)._id;
      
      console.log(this.cartData)
      this.cartData && this.Product.removeToCart(this.cartData._id).subscribe((result) => {
        if (result) {
          this.Product.getCart(userId)
        }
      })
      this.removeCart = false
    }

  }

}
