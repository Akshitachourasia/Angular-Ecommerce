import { Component } from '@angular/core';
import { SellersService } from '../services/sellers.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from '../data-types';
@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'] 
})
export class SellerAuthComponent {
  constructor(private sellersService: SellersService, private router: Router) {

  }  //service name

  signUp(data: Signup) {
    console.log(data);
    this.sellersService.userSignUp(data)
      .subscribe(result => {
       if(result) {
        this.router.navigate(['seller-home']);
       }

      });
  }
}