import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log( this.route.data);
    this.route.data.subscribe((x: Date) => {
      this.errorMessage = x['message'];
    });
  }

}
