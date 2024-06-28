import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signup } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class SellersService {
  constructor(private http: HttpClient) {}

  userSignUp(data: Signup) {

    return this.http.post('http://localhost:3000/sellers', data);
  }
}