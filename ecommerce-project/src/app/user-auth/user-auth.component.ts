import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Signup } from '../data-types';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule ,FormsModule ],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  constructor(private user: UserService, private http:HttpClient , private router:Router) { }
signUp(data: Signup) {
this.http.post('http://localhost:4545/customers', data, {
  observe: 'response' 
}).subscribe((result) => {
  if (result) {
    localStorage.setItem('user', JSON.stringify(result.body))
    this.router.navigate(['/'])

  }
})
}

}