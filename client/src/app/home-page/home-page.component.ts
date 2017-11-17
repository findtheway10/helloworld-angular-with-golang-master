import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  private isLoggedIn :String;
  private user_displayName: String;
  private user_email: String;
  private user_uid: String;

  // Store a reference to the enum

  constructor(public authService: AuthService, private router: Router) {

    this.isLoggedIn = '1';

    this.authService.currentUserObservable.subscribe(

      (auth) => {

        if (auth == null) {
          console.log("Logged out");
          this.isLoggedIn = '3';
          this.user_displayName = '';
          this.user_email = '';
          this.user_uid = '';
          //this.router.navigate(['home']);
        } else {


          this.isLoggedIn = '2';
          this.user_displayName = auth.displayName;
          this.user_email = auth.email;
          this.user_uid = auth.uid;
          this.test();
          console.log("Logged in");
          console.log(auth);
          //this.router.navigate(['home']);
        }
      }

    );
  }

  ngOnInit() {

  }

  test() {
    console.log("test click");
    this.authService.uidCheck();
  }

  logout() {
    this.authService.signOut();
  }

}
