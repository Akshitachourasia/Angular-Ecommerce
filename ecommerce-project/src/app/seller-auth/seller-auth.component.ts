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
  }  //service name
  showLogin = false
ngOnInit(): void {  
  this.seller.reloadSeller()
}
  signUp(data: Signup) {
    console.log(data);
    this.seller.userSignUp(data)
  }
  login(data: any) {
    console.log(data);

  }
  openLogin() {
this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}