import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-types';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orderData: order[] | undefined
  orderMessage: string = ""
  constructor(private Product: ProductService) { }
  ngOnInit(): void {
    this.getOrderList()
  }
  cancelOrder(_id?: string): void {
    if (_id) {
      this.Product.cancelOrder(_id).subscribe(() => {
        this.getOrderList();
      });
    } else {
      console.error('Order ID is undefined');
    }
  }
  getOrderList() {
    this.Product.orderList().subscribe((result) => {
      this.orderData = result
    })
  }
}
