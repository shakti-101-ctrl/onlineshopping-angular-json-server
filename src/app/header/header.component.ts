import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = "default";
  sellerName: string = '';
  searchSresult :undefined | Product[];
  constructor(private route: Router , private product : ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = "seller";
          if (localStorage.getItem('seller')) {

            let sellerStore = localStorage.getItem('seller');
            //console.warn(sellerStore);
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            console.warn(sellerData);
            this.sellerName = sellerData.name;
          }
        }
        else {
          this.menuType = "default";
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  searchProduct(query : KeyboardEvent) {
    if(query)
    {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result)=>{
        if(element.value)
        {
          
          if(result.length>5)
          {
            result.length = 5;
          }
          this.searchSresult = result; 
        }
        else
        {
          
          this.searchSresult = undefined;
        }  
        
      });
    }
    
   
  }

  clearSearch()
  {
    this.searchSresult = undefined;
  }
}
