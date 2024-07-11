import { EventEmitter, Injectable } from '@angular/core';
import { Login, Signup } from '../data-types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'

})
export class UserService {
  invalidUserAuth= new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(user: Signup) {
    this.http.post('https://server-eight-ebon.vercel.app/customers', user, { observe: 'response' })
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
  userLogin(data:Login){
    this.http.get<Signup[]>(`https://server-eight-ebon.vercel.app/customers/login?email=${data.email}&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result)=>{
      if(result && result.body){
        console.log(result.body)
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/']);
        this.invalidUserAuth.emit(false)
      }else{
        this.invalidUserAuth.emit(true)
      }
    })
  }
}
