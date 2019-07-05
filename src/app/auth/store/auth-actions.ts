import { Action } from '@ngrx/store';


export const LOGIN_START = '[Auth] Login Start';
export const LOGIN = '[Auth] LogIn';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const LOGOUT = '[Auth] LogOut';
export const SIGNUP_START = '[Auth] SignUp Start';
export const SIGNUP = '[Auth] SignUp';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';


export class SignUpStart implements Action {
    readonly type = SIGNUP_START;

    constructor(public payload: { email: string; password: string }) { }
}

export class SignUp implements Action {
    readonly type = SIGNUP;

    constructor(
        public payload: {
            email: string;
            userId: string;
            token: string;
            expirationDate: Date
        }) { }
}

export class Login implements Action {
    readonly type = LOGIN;

    constructor(
        public payload: {
            email: string;
            userId: string;
            token: string;
            expirationDate: Date
        }) { }
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: { email: string, password: string }) { }
}

export class LogOut implements Action {
    readonly type = LOGOUT;
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;

    constructor(public payload: string) { }
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions =
    Login |
    LogOut |
    LoginFail |
    LoginStart |
    SignUpStart |
    SignUp |
    ClearError |
    AutoLogin;
