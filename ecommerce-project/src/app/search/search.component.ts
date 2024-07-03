import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink , CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchResult:undefined|Product[]
  constructor(private activeRoute: ActivatedRoute, private product:ProductService) { }
 
  ngOnInit(): void {  
    let query = this.activeRoute.snapshot.paramMap.get('query') 
    query && this.product.searchProduct(query).subscribe((result)=>{
      this.searchResult = result
    })
     
  } 

  }

