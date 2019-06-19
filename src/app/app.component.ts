import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';
 constructor(private AuthService: AuthenticationService) {}
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {
    this.AuthService.autoLogin();
  }
}
