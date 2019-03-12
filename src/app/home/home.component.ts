import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberOfSubscription: Subscription;
  customOfSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    const myObservable = interval(1000);
   this.numberOfSubscription =  myObservable.subscribe(x => {
      console.log(x);
    });

    const myNumbers = Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);

      setTimeout(() => {
        observer.next('second package');
      }, 3000);

      setTimeout(() => {
        observer.next('this does not work');
      }, 5000);
    });

    this.customOfSubscription = myNumbers.subscribe((data) => { console.log(data); }, (error) => { console.log(error); }, () => {});
  }
  ngOnDestroy() {
    this.customOfSubscription.unsubscribe();
    this.numberOfSubscription.unsubscribe();
  }

}
