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
  constructor(private route: Router) { }
ngOnInit(): void {
  this.route.events.subscribe((val: any) => {
    if (val.url) {
      if (localStorage.getItem('seller') && val.url.includes('seller')) {
       console.log("seller logged in")
       this.menuType = "seller"
      }
      else {
        console.log("seller not logged in")
        this.menuType = "default"
      }
    }
  })
}
}
