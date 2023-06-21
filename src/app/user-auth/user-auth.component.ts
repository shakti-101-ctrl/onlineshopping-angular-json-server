import { Component, OnInit } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin : boolean = false;
  loginFiledMessage : string ="";
  constructor(private user: UserService) { }

  ngOnInit(): void {
  }
  signUp(data : SignUp)
  {
    this.user.userSignUp(data);
    
  }
  login(data : Login) : void
  {
    this.user.userLogin(data);
    this.user.isvalidUserAuth.subscribe((result)=>
    {
      if(result)
      {
        this.loginFiledMessage ="Invalid user id and password";
      }
     
    });
    
  }
  openLogin()
  {
    this.showLogin = true;
  }
  openSignup()
  {
    this.showLogin = false;
  }

}
