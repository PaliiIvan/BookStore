import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
user: {id: number, name: string};

/**
 *
 */
constructor(private route: ActivatedRoute) {}

 ngOnInit() {

 }

}
