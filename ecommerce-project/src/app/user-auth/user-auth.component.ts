import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login, Signup } from '../data-types';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  showLogin = true
  constructor(private user: UserService, private http: HttpClient, private router: Router) { }
  signUp(data: Signup) {
    this.user.userSignUp(data);
  }
  ngOnInit(): void {
    this.user.userAuthReload()
  }

  login(data: Login) {
    this.user.userLogin(data);
  }
 
  openSignUp(){
    this.showLogin=false
  }
  openLogin(){
    this.showLogin=true
  }
}