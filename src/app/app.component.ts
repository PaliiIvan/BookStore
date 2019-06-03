import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Ivan', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, this.forbiddenNames.bind(this)),
      'email': new FormControl(null, [Validators.email],  this.forbiddenEmails.bind(this)),
      'gender': new FormControl(),
      'hobbies': new FormArray([])
    });

  }

  onSubmit() {
    const userName = this.signupForm.get('email');
    console.log(userName);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUserNames.indexOf(control.value)) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
     const promise = new Promise<any>((resolve, reject) => {
       setTimeout(() => {
         if (control.value === 'test@test.com') {
           resolve({'nameIsForbidden': true});
         } else {
           resolve(null);
         }
       }, 1500);
     });
     return promise;
  }
}
