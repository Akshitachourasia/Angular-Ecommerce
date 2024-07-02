import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from '../data-types';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule , RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  icon = faTrash;
  Editicon = faEdit;
  productMessage: undefined | string;
  constructor(private http: HttpClient, private product: ProductService) { }

  productList: undefined | Product[]
  ngOnInit(): void {
    this.list()
  }

  deleteProduct(id: string) {
    console.log("Clicked", id)
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product deleted successfully"
        this.list()
      }
    })
  }

  list() {
    this.product.productList().subscribe((result) => {
      this.productList = result;
      console.log(this.productList);
    })
    setTimeout(() => {
      this.productMessage = undefined
    }, 3000)
  }


}
