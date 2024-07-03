import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  popularProducts: undefined | Product[]
  constructor(private Product: ProductService) { }
  ngOnInit(): void {
    this.Product.popularProducts().subscribe((data) => {
      console.log(data)
      this.popularProducts = data
    })
  }

}
