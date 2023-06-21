import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDetails : undefined | Product
  productQuantity : number=1;
  constructor(private product : ProductService,private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
    let productId= this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productDetails = result;
    });
  }

  handleQuantity(choice : string)
  {
    if(this.productQuantity<20 && choice==='plus')
    {
      this.productQuantity ++;

    }
    else if(this.productQuantity>1 && choice==='min')
    {
      this.productQuantity --;
    }
  }

  addToCart()
  {
    if(this.productDetails)
    {
      this.productDetails.quantity = this.productQuantity;
      if(!localStorage.getItem('user'))
      {
        console.warn(this.productDetails);
        this.product.localAddToCart(this.productDetails);
      }
      else
      {
        console.warn('else');
      }
    }
  }


}
