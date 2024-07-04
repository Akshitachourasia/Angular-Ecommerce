import { Injectable } from '@angular/core';
import { Login, Signup } from '../data-types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'

})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(user: Signup) {
    this.http.post('http://localhost:4545/customers', user, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }

      })

  }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  userLogin(data: Login) {
    this.http.get(`http://localhost:4545/customers/login?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((result) => {
        if (result && result.body) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/user-auth']);
          console.log('Please enter valid details')
        }
      })
  }
}
