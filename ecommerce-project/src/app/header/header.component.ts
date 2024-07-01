import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet , Router} from '@angular/router';
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
  constructor(private route: Router) { }
ngOnInit(): void {
  this.route.events.subscribe((val: any) => {
    if (val.url) {
      if (localStorage.getItem('seller') && val.url.includes('seller')) {
       console.log("seller logged in")
       this.menuType = "seller"
       if (localStorage.getItem('seller')) {
        let sellerStore = localStorage.getItem('seller')
        let sellarData = sellerStore && JSON.parse(sellerStore)[0]
        console.log(sellarData.name,"lllllllllllllllllllllllll")
        this.sellerName = sellarData.name
      
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

}
