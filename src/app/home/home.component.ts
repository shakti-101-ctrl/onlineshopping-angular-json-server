import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popuplarProduct : undefined | Product[]
  tendyProduts :undefined | Product[]

  constructor(private product: ProductService) { }
  ngOnInit(): void {
    this.product.getProductforslide().subscribe((data)=>
    {
      this.popuplarProduct = data;
    });

    this.product.tendyProducts().subscribe((data)=>
    {
      this.tendyProduts = data;
    });
    
  }

}
