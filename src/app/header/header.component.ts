import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthenticationService } from '../auth/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataService: DataStorageService, private authService: AuthenticationService) {}
  private userSub: Subscription;
  isAuthentificated = false;

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthentificated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataService.saveRecipes().subscribe(x => console.log(x));
  }

  onFetchData() {
    this.dataService.getAllRecipes().subscribe();
  }

  onLogOut() {
    this.authService.logout();
  }
}
