import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet , Router} from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet , RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuType: string = "default"
  sellerName: string = ""
searchResult : undefined | Product[]
  constructor(private route: Router , private Product: ProductService) { }
ngOnInit(): void {
  this.route.events.subscribe((val: any) => {
    if (val.url) {
      if (localStorage.getItem('seller') && val.url.includes('seller')) {
       console.log("seller logged in")
       this.menuType = "seller"
       if (localStorage.getItem('seller')) {
        let sellerStore = localStorage.getItem('seller')
        let sellerData = sellerStore && JSON.parse(sellerStore)[0]
        console.log(sellerData,"data")
        this.sellerName=sellerData.username
        console.log(this.sellerName)
    
      }
      }
      else {
        console.log("seller not logged in")
        this.menuType = "default"
      }
    }
  })
}
logOut(){
  localStorage.removeItem('seller')
  this.route.navigate(['/'])
}
searchProduct(query: KeyboardEvent){
if(query){
  let element = query.target as HTMLInputElement;
  this.Product.searchProduct(element.value).subscribe((result)=>{
    this.searchResult = result
    if(result.length >5){
   result.length = 5;
    }
    console.log(result)
  })
}
 
}
hideSearch(){
  this.searchResult = undefined 
}
}
