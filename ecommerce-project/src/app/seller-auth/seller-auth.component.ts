import { Component } from '@angular/core';
import { SellersService } from '../services/sellers.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from '../data-types';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'] 
})
export class SellerAuthComponent {
  constructor(private seller: SellersService, private router: Router) {
  }  
  showLogin = false
  authError : string ="" 
ngOnInit(): void {  
  this.seller.reloadSeller()
}
  signUp(data: Signup) {
    console.log(data);
    this.seller.userSignUp(data)
  }
  login(data: any) {
    this.authError = ""
 this.seller.userLogin(data)
 this.seller.isLoginError.subscribe((isError) => {
   if (isError) {
     this.authError = "Email or password is not correct"
   } 
 })
  }
  openLogin() {
this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}