import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { AuthErrorMessages } from './authentication/auth-error-messages';
import { AuthenificationResponce } from './authentication/authResponce';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user = new BehaviorSubject<User>(null);
  tokenExpiration: any;
  constructor(private http: HttpClient, private router: Router) { }

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
    }), tap(resData => {
      const expiretionData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      const user = new User(resData.email, resData.localId, resData.idToken, expiretionData);
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthenificationResponce>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDZkx1l-2M4XyVgaposfwbXiENi0WaQ2v4',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorRes => {
      let errorMessage = 'An unknown error ocurred!';
      errorMessage = AuthErrorMessages.AuthMessage[errorRes.error.error.message];
      return throwError(errorMessage);
    }), tap(resData => {
      const expiretionData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      const user = new User(resData.email, resData.localId, resData.idToken, expiretionData);
      this.user.next(user);
      this.autoLogout(+resData.expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
    }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/recipes']);
    localStorage.removeItem('userData');
  }

  autoLogout(expirationDiration: number) {
    this.tokenExpiration = setTimeout(() => {
      this.logout();
    }, expirationDiration );
  }

  autoLogin() {
    const userData: {
       email: string,
       id: string,
      // tslint:disable-next-line: variable-name
       _token: string,
      // tslint:disable-next-line: variable-name
       _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDiration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDiration);
    }
  }
}
