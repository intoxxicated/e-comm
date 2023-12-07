import {EventEmitter, Injectable} from '@angular/core';
import {LoginType, SignUpType} from "../data-types";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoginError=new EventEmitter<boolean>(false);
  isUserLoggedIn=new BehaviorSubject<boolean>(false);

  constructor( private http:HttpClient, private router:Router) { }

  userSignUp(user:SignUpType)
  {
    this.http.post("http://localhost:3000/user",user,{observe:'response'})
      .subscribe((result)=>{
        console.warn(result)
        if(result){
          localStorage.setItem('user',JSON.stringify(result.body))
          this.router.navigate(['/'])
        }

      })
  }

  userReload()
  {
    if(localStorage.getItem('user')){
      this.isUserLoggedIn.next(true);

      this.router.navigate(['/'])
    }
  }

  userLogin(user:LoginType)
  {
    this.http.get(`http://localhost:3000/user?email=${user.email}&pass=${user.password}`,
      {observe:'response'}
    ).subscribe((result:any)=>{
      if (result && result.body && result.body.length){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/']);

      }
      else{
        this.isLoginError.emit(true);

      }


    });
  }
}
