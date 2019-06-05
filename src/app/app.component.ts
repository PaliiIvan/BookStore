import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

projectDataForm = new FormGroup({
  'projectName': new FormControl(null, this.projectNameValidator.bind(this)),
  'mail': new FormControl(null, null, this.mailValidator.bind(this)),
  'projectStatus': new FormControl(['Stable'])
});

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.projectDataForm.controls);
  }
 projectNameValidator(control: FormControl): {[s: string]: boolean} {
  if (control.value === 'test') {
    return {'invalidProjectName': true};
  } else {
    return null;
  }
 }
  mailValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if (control.value === 'test') {
        resolve({'invalidProjectName': true});
      } else {
        resolve(null);
      }
    });
    return promise;
  }

}
