import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { AuthErrorMessages } from './authentication/auth-error-messages';
import { AuthenificationResponce } from './authentication/authResponce';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }
  signUp(email: string, password: string) {
    return this.http.post<AuthenificationResponce>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDZkx1l-2M4XyVgaposfwbXiENi0WaQ2v4',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorRes => {
      let errorMessage = 'An unknown error ocurred!';
      errorMessage = AuthErrorMessages.AuthMessage[errorRes.error.error.message];
      return throwError(errorMessage);
    }));
  }
}
