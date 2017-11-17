import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';


@Injectable()
export class AuthService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  //// Social Auth ////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithRedirect(provider)
      .then((credential) =>  {

        this.authState = credential.user

        //this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  //// Helpers ////
/*  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
    let path = `users/${this.currentUserId}`; // Endpoint on firebase
    let data = {
      email: this.authState.email,
      name: this.authState.displayName
    }

    this.db.object(path).update(data)
      .catch(error => console.log(error));

  }*/

  //// Sign Out ////
  signOut(): void {
    this.afAuth.auth.signOut();
    //this.router.navigate(['home'])
  }

}
