import { Component } from '@angular/core';
import {AuthService} from "../providers/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  authState: any = null;

  constructor(public authService: AuthService) {
  }

  login() {
    this.authService.googleLogin().then((data) => {
      //this.router.navigate(['home']);
      console.log("login : success");
    })
  }
}
