import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | Product;
  updateMessage : undefined | string
  constructor(private route: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId: string | null = this.route.snapshot.paramMap.get("id");
    productId && this.product.getProduct(productId).subscribe((data) => {
      this.productData = data;

    });
  }
  submit(data: Product) {
    if(this.productData)
    {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result)
      {
        this.updateMessage ="updated successfully!";
      }
    })
    setTimeout(()=>{
      this.updateMessage = undefined
    },3000);

  }

}
