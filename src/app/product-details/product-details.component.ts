import { Component, OnInit } from '@angular/core';
import { Cart, Product } from '../data-type';
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
  removeCart = false;
  constructor(private product : ProductService,private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
    let productId= this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productDetails = result;
    });
    //remove the duplicate item in page load
    let cartData = localStorage.getItem('localCart');
    if(productId && cartData)
    {
      let items = JSON.parse(cartData);
      items=items.filter((item : Product)=>productId==item.id.toString());
      if(items.length)
      {
        this.removeCart = true;
      }
      else
      {
        this.removeCart = false;
      }
    }
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
        this.removeCart = true;
      }
      else
      {
       let user = localStorage.getItem('user');
       let userId= user && JSON.parse(user).id;
       let cartData : Cart=
       {
        ...this.productDetails,
        userId,
        productId : this.productDetails.id
       }
       
       delete cartData.id;
       //console.warn(cartData);
       this.product.addToCart(cartData).subscribe((result)=>{
        if(result)
        {
          alert("Product added in cart");
        }
       });
      }
    }
  }

  removeToCart(productid : number)
  {
    this.product.removeItemFromCart(productid);
    this.removeCart = false;
  }

}
