import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  deleteMessage:string='';
  productList:undefined | Product[]
  constructor(private product : ProductService) { }

  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct()
  {
    this.product.productList().subscribe((result)=>{
      this.productList = result;
    });
  }
  deleteProduct(id:number)
  {
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result)
      {
        this.deleteMessage="Deleted successfully!";
        this.loadProduct();
      }
    })
    setTimeout(() => {
      this.deleteMessage=''
    }, 3000);

  }
}
