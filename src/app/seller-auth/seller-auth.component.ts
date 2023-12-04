import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SellerAuthService} from "../services/seller-auth.service";
import {Router} from "@angular/router";
import {LoginType, SignUpType} from "../data-types";
import {NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatInputModule
  ],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
  providers:[SellerAuthService]
})
export class SellerAuthComponent implements OnInit{
  constructor(private sellerService:SellerAuthService,private router:Router) {
  }

  showLogin=false;
  authError:string='';
  ngOnInit():void{
    this.sellerService.reloadSeller();
  }
  signUp(data:SignUpType):void
  {
    console.warn(data)
    this.sellerService.userSignUp(data);


  }
  openLogin(){

    this.showLogin=true;
  }
  openSignUp(){

    this.showLogin=false;
  }
  login(data:LoginType):void
  {
    this.sellerService.userLogin(data);
    this.sellerService.isLoginError.subscribe((error)=>{
      if(error){
        this.authError='Email or Password is incorrect !!';
      }
    })

  }
}
