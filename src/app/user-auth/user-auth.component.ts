import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {cart, LoginType, Product, SignUpType} from "../data-types";
import {UserService} from "../services/user.service";
import {MatButtonModule} from "@angular/material/button";
import {SellerProductService} from "../services/seller-product.service";

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
  providers:[UserService,SellerProductService]
})
export class UserAuthComponent  implements OnInit{
    showLogin=false;
    authError: any;

    constructor( private user:UserService,private product:SellerProductService) {
    }

  ngOnInit(): void {
      this.user.userReload()
  }
    signUp(data:SignUpType) {
      this.user.userSignUp(data)
    }

    openLogin() {
      this.showLogin=true;

    }

    login(data: LoginType) {
      this.user.userLogin(data);
      this.user.isLoginError.subscribe((error)=>{
        if (error){
          this.authError='Email or Password is incorrect !!';

        }
        else{
          this.localCartToRemoteCart();
        }
      })

    }

    openSignUp() {
      this.showLogin=false;

    }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId= user && JSON.parse(user).id;
    if(data){
      let cartDataList:Product[]= JSON.parse(data);

      cartDataList.forEach((product:Product, index)=>{
        let cartData:cart={
          ...product,
          productId:product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn("data is stored in DB");
            }
          })
        }, 500);
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
        }
      })
    }

    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);

  }
}
