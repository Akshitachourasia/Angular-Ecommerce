import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule ,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  trendyProducts: undefined | Product[]
  popularProducts: undefined | Product[]
  constructor(private Product: ProductService) { }
  ngOnInit(): void {
    this.Product.popularProducts().subscribe((data) => {
      console.log(data)
      this.popularProducts = data
    })
    this.Product.trendyProducts().subscribe((data) => {
      console.log(data)
      this.trendyProducts = data
    })
  
  }

}
