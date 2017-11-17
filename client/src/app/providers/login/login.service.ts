import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  message: string;
  user_nickname: string;
  is_first_user: boolean;
  user_token: string;
}



@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }

  get uidCheck(): any {

    this.http.post<LoginResponse>('/login', {
      //user_uid: this.authState.user_uid,
      //user_email: this.authState.user_email,
      user_uid: "22",
      user_email: "1123email@asdfg.aa",
    })
      .subscribe(
        res => {
          console.log(res);
          return res;
        },
        err => {
          console.log("Error : login fail");
        }
      );

    return
  }

}
