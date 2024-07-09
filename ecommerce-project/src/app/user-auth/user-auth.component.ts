import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart, Login, Product, Signup } from '../data-types';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  showLogin = true
  authError:string= "" ;
  constructor(private user: UserService , private Product: ProductService,) { }
  signUp(data: Signup) {
    this.user.userSignUp(data);
  }
  ngOnInit(): void {
    this.user.userAuthReload()
  }

  login(data: Login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      if(result){
         this.authError="User not found"
      }else{
        this.localToCart();
      }
      
    })
  }

  openSignUp() {
    this.showLogin = false
  }
  openLogin() {
    this.showLogin = true
  }
  localToCart() {
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user)._id
    if (data) {
      let CartList: Product[] = JSON.parse(data)
      CartList.forEach((Product, index) => {
        let cartData: Cart = {
          ...Product,
          productId: Product._id,
          userId,
        }
        delete cartData._id
  
          this.Product.addToCart(cartData).subscribe((result) => {
            if (result) {
              alert('Item stored in DataBase')
            }
          })
          if(CartList.length===index+1){
            localStorage.removeItem('localCart')
          }
 
      });
    }
    this.Product.getCart(userId)
  }
}
