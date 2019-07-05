import { Actions, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth-actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((authData: AuthActions.SignUpStart) => {
            return this.http
            .post<AuthResponseData>(
              'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDZkx1l-2M4XyVgaposfwbXiENi0WaQ2v4',
              {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
              }
            ).pipe(
                map(resData => {
                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);

                    return new AuthActions.SignUp(
                        {
                            email: resData.email,
                            userId: resData.localId,
                            token: resData.idToken,
                            expirationDate
                        }
                    );
                }),
                catchError(errorRes => {

                    let errorMessage = 'An unknown error occurred!';
                    if (!errorRes.error || !errorRes.error.error) {
                      return of(new AuthActions.LoginFail(errorMessage));
                    }
                    switch (errorRes.error.error.message) {
                      case 'EMAIL_EXISTS':
                        errorMessage = 'This email exists already';
                        break;
                      case 'EMAIL_NOT_FOUND':
                        errorMessage = 'This email does not exist.';
                        break;
                      case 'INVALID_PASSWORD':
                        errorMessage = 'This password is not correct.';
                        break;
                    }

                    return of(new AuthActions.LoginFail(errorMessage));
                })
            );
        })
    );

    @Effect({dispatch: false})
    signUpSuccess = this.actions$.pipe(
        ofType(AuthActions.SIGNUP),
        tap(() => this.router.navigate(['/']))
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
                .post<AuthResponseData>(
                    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDZkx1l-2M4XyVgaposfwbXiENi0WaQ2v4',
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }
                ).pipe(
                    map(resData => {
                        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);

                        return new AuthActions.Login(
                            {
                                email: resData.email,
                                userId: resData.localId,
                                token: resData.idToken,
                                expirationDate
                            }
                        );
                    }),
                    catchError(errorRes => {

                        let errorMessage = 'An unknown error occurred!';
                        if (!errorRes.error || !errorRes.error.error) {
                          return of(new AuthActions.LoginFail(errorMessage));
                        }
                        switch (errorRes.error.error.message) {
                          case 'EMAIL_EXISTS':
                            errorMessage = 'This email exists already';
                            break;
                          case 'EMAIL_NOT_FOUND':
                            errorMessage = 'This email does not exist.';
                            break;
                          case 'INVALID_PASSWORD':
                            errorMessage = 'This password is not correct.';
                            break;
                        }

                        return of(new AuthActions.LoginFail(errorMessage));
                    })
                );
        }),
    );

    @Effect({dispatch: false})
    authSucces = this.actions$.pipe(
        ofType(AuthActions.LOGIN, AuthActions.LOGOUT),
        tap(() => {
            this.router.navigate(['/']);
        })
    );
}
//https://vk.com/hikkikomorii/music?day=14012016