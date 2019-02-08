import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 logged = false;
  constructor() { }

isAuthenticated() {
  const promise = new Promise(
    (resolve, reject) => {
    setTimeout(() => {
      resolve(this.logged);
    }, 800);
  });

  return promise;
}

  logIn() {
    this.logged = true;
  }

  logOut() {
    this.logged = false;
  }
}
