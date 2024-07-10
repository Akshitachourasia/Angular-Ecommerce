import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { order } from '../data-types';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  totalAmount: number | undefined
  constructor(private Product: ProductService) { }
  ngOnInit(): void{
  this.Product.currentCart().subscribe((result) => {
    let amt = 0;
    result.forEach(items => {
      if (items.quantity) {
        amt = amt + (+items.price * + items.quantity)
      }
    });
    this.totalAmount = amt + 100 + (amt / 10) - (amt / 10)
  })
}
  orderNow(data:{email:string ,address:string, contact:number}){
    let user =  localStorage.getItem('user')
    let userId = user && JSON.parse(user)._id;
    let orderData:order={
      ...data,
      totalAmount:this.totalAmount,
      userId,
    }
    this.Product.orderNow(orderData).subscribe((result)=>{
      alert("Order Placed...!!")
    })
  }
}
