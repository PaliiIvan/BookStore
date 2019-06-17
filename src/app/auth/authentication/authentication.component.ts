import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { timingSafeEqual } from 'crypto';
import { AuthErrorMessages } from './auth-error-messages';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5)])
  });

  constructor(private authService: AuthenticationService) { }

  onSwitchUser() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.isLoading = true;
    if (!this.isLoginMode) {

    } else {
      this.authService.signUp(email, password).subscribe(responce => {
        console.log(responce);
        this.isLoading = false;
        this.loginForm.reset();
      }, errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      });
    }

  }

}
