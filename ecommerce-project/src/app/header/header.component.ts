import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuType: string = "default"
  cartItems = 0
  sellerName: string = ""
  customerName: string = ""
  searchResult: undefined | Product[]
  constructor(private route: Router, private Product: ProductService) { }
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.log("seller logged in")
          this.menuType = "seller"
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller')
            let sellerData = sellerStore && JSON.parse(sellerStore)
            console.log(sellerData, "data")
            this.sellerName = sellerData.username
            console.log(this.sellerName)

          }
        }
        else if (localStorage.getItem('user')) {
          this.menuType = "user"
          let customerStore = localStorage.getItem('user')
          let customerData = customerStore && JSON.parse(customerStore)
          this.customerName = customerData.name
          this.Product.getCart(customerData._id)
        }
        else {
          this.menuType = "default"
        }
      }
    })
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length
    }
    this.Product.cartData.subscribe((items) => {
      this.cartItems = items.length
    })
  }
  logOut() {
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      let element = query.target as HTMLInputElement;
      this.Product.searchProduct(element.value).subscribe((result) => {
        this.searchResult = result
        if (result.length > 5) {
          result.length = 5;
        }
        console.log(result)
      })
    }

  }
  hideSearch() {
    this.searchResult = undefined
  }

  search(query: string) {
    this.route.navigate([`search/${query}`])

  }
  redirectToDetails(id: string) {
    this.route.navigate([`details/${id}`])
  }
  userLogOut() {
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
    this.Product.cartData.emit([])
  }
}
