import { Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(user: SignUp) {
    this.http.post("http://localhost:3000/users", user, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result);

        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }
  userLogin(user: Login) {
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${user.email}&password=${user.password}`,{observe:'response'})
    .subscribe((result)=>{
      //console.warn(result);
      if(result && result.body)
      {
        //console.warn(result.body[0]);
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
      }

    });
  }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
