import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Signup } from '../data-types';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule ,FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
signUp(data: Signup) {
  console.log(data);
}
}