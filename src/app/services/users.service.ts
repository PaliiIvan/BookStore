import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 users: User[] = [
   new User('Max', true, 1),
   new User('An', true, 2),
   new User('Jonathan', false, 3),
   new User('I', true, 4)
 ];
  changeUserStatusEmmiter = new EventEmitter<void>();

  constructor() {

   }

   changeStatus(id: number, status:boolean) {
     const user: User = this.users.find(x => x.id === id);
     user.status = status;
     this.changeUserStatusEmmiter.emit();
   }
}
