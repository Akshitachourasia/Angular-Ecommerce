import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, Summary } from '../data-types';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartData: Cart[] | undefined

  summary: Summary = {
    amount: 0,
    tax: 0,
    delivery: 0,
    discount: 0,
    total: 0
  }
  constructor(private Product: ProductService, private router: Router) {}
  ngOnInit(): void {
    this.Product.currentCart().subscribe((result) => {
      this.cartData = result
      let amt = 0;
      result.forEach(items => {
        if (items.quantity) {
          amt = amt + (+items.price * + items.quantity)
        }
      });
      console.log(amt)
      this.summary.amount = amt;
      this.summary.delivery = 100
      this.summary.discount = amt / 10;
      this.summary.tax = amt / 10;
      this.summary.total = parseFloat((amt + 100 + (amt / 10) - (amt / 10)).toFixed(2));

    })
  

  }
  checkout() {
    this.router.navigate(['/checkout'])

  }
}
