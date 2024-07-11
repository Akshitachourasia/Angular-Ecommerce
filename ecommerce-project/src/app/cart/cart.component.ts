import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, Summary } from '../data-types';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartData: Cart[] | undefined
  isLoggedIn: boolean = false;
  summary: Summary = {
    amount: 0,
    tax: 0,
    delivery: 0,
    discount: 0,
    total: 0
  }
  constructor(private Product: ProductService, private router: Router, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.snackBar.open('Want to see the cart? Please log in first.', 'Close', {
        duration: 3000, 
      });
      this.router.navigate(['/user-auth']);
    } else {
      this.loadDetails();
    }
  }
  checkout() {
    this.router.navigate(['/checkout'])
  }
  loadDetails() {
    this.Product.currentCart().subscribe((result) => {
      this.cartData = result
      let amt = 0;
      result.forEach(items => {
        if (items.quantity) {
          amt = amt + (+items.price * + items.quantity)
        }
      });
      this.summary.amount = amt;
      this.summary.delivery = 100
      this.summary.discount = amt / 10;
      this.summary.tax = amt / 10;
      this.summary.total = parseFloat((amt + 100 + (amt / 10) - (amt / 10)).toFixed(2));
      if (!this.cartData.length) {
        this.router.navigate(['/'])
      }
    })
  }
  removeToCart(cartId: string | undefined) {
    cartId && this.cartData && this.Product.removeToCart(cartId).subscribe((result) => {
      this.loadDetails()
    })

  }
}
