import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  addProduct(data:Product)
  {
    return this.http.post("http://localhost:3000/products",data);
  }
  productList()
  {
    return this.http.get<Product[]>("http://localhost:3000/products");
  }

  deleteProduct(id:number)
  {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProduct(id:string)
  {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product:Product)
  {
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`,product);
  }
}
