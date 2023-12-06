import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {SignUpType} from "../data-types";

@Component({
  selector: 'app-user-auth',
  standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent  {
    showLogin='default';
    authError: any;

    constructor() {
    }
    signUp(data:SignUpType) {
    // this.user.userSignUp(data)
    }

    openLogin() {

    }

    login(data: any) {

    }

    openSignUp() {

    }
}
