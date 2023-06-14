import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import {Router} from '@angular/router';
import { Login, SignUp } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  showLogin = false;
  authError:string='';
  constructor(private seller:SellerService,private router: Router)
  {
  }
  ngOnInit()
  {
    this.seller.reloadSeller();

  }
  signUp(data: SignUp): void {

    this.seller.userSignUp(data);
  }
  login(data: Login): void {
    this.authError="";
    console.warn(data);
    this.seller.userLogin(data);
    this.seller.islogginError.subscribe((isError)=>{
      if(isError)
      {
        console.warn("Hi ! I am in seller-auth");
        this.authError ="Email or password is not correct";
      }
    });
    
  }
  openLogin()
  {
    this.showLogin=false;
  }
  openSignUp()
  {
    
    this.showLogin=true;
  }

}
