import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Signup } from '../data-types';
import { BehaviorSubject } from 'rxjs';
import { ChildActivationEnd, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellersService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError=new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: Signup) {
    this.http.post('https://server-eight-ebon.vercel.app/users', data, {
      observe: 'response'
    }).subscribe((result) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body))
      this.router.navigate(['seller-home']);
      console.log("result", result);
    })
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data: Login) {
    console.log(data);
    this.http.get(`https://server-eight-ebon.vercel.app/users/login?email=${data.email}&password=${data.password}`,
       {
      observe: 'response'
    }).subscribe((result) => {
      if (result && result.body
    
      ) {
        console.log("user logged in");
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);

      } else {
        console.log("login failed");
        this.isLoginError.emit(true)
      }
    })
  }
}