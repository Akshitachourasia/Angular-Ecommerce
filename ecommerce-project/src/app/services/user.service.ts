import { Injectable } from '@angular/core';
import { Signup } from '../data-types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'

})
export class UserService {

  constructor(private http:HttpClient,private router:Router) { }
  userSignUp(user:Signup){
    this.http.post('http://localhost:4545/customers',user,{observe:'response'})
    .subscribe((result)=>{
     if(result){
       localStorage.setItem('user',JSON.stringify(result.body));
       this.router.navigate(['/']);
     }
     
    })
     
   }
   userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
   }
}
