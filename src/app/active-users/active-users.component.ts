import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user-model';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
 users: User[] = [];
  constructor(private usersService: UsersService) {
    this.users = this.usersService.users.filter(x => x.status === true);
   }

  ngOnInit() {
    this.usersService.changeUserStatusEmmiter.subscribe(x => {
      this.users = this.usersService.users.filter(u => u.status === true);
    });
  }
  toInActive(id: number) {
    this.usersService.changeStatus(id, false);
  }
}
