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
  constructor(private Product: ProductService) { }
  ngOnInit(): void {
    this.Product.orderList().subscribe((result) => {
      this.orderData = result
    })
  }

}
