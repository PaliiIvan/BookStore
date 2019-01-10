import { Component, OnInit } from '@angular/core';
import { User } from '../models/user-model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  users: User[] = [];
  constructor(private usersService: UsersService) {
    this.users = this.usersService.users.filter(x => x.status === false);
   }

  ngOnInit() {
    this.usersService.changeUserStatusEmmiter.subscribe(x => {
      this.users = this.usersService.users.filter(u => u.status === false);
    });
  }
  toActive(id: number) {
    this.usersService.changeStatus(id, true);
  }
}
