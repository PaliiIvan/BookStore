import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Observable, from } from 'rxjs';
import { AuthenificationResponce } from './authResponce';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthenticationService, private router: Router) { }

  onSwitchUser() {
    this.isLoginMode = !this.isLoginMode;
    this.error = '';
  }

  onSubmit() {

    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.isLoading = true;

    if (this.isLoginMode) {
      console.log('login');
      this.authService.login(email, password)
        .subscribe(responce => {
          this.router.navigate(['/recipes']);
          this.isLoading = false;
          this.loginForm.reset();
        }, errorMessage => {
          this.isLoading = false;
          this.error = errorMessage;
        });
    } else {
      console.log('signUp');
      this.authService.signUp(email, password)
        .subscribe(responce => {
          this.router.navigate(['/recipes']);
          this.isLoading = false;
          this.loginForm.reset();
        }, errorMessage => {
          this.isLoading = false;
          this.error = errorMessage;
        });


    }
  }

}
