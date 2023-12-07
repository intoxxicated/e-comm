import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {LoginType, SignUpType} from "../data-types";
import {UserService} from "../services/user.service";
import {MatButtonModule} from "@angular/material/button";

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
  providers:[UserService]
})
export class UserAuthComponent  implements OnInit{
    showLogin=false;
    authError: any;

    constructor( private user:UserService) {
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
      })

    }

    openSignUp() {
      this.showLogin=false;

    }
}
