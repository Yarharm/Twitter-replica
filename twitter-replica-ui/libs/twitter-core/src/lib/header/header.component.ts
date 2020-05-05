import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../http-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'twitter-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authStatus = false;
  private authTokenSubs = new Subscription();
  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.authStatus = this.authService.getAuthStatus();
    this.authTokenSubs = this.authService
      .getAuthTokenListener()
      .subscribe((hasAuthToken: boolean) => {
        this.authStatus = hasAuthToken;
      });
  }

  onLogOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authTokenSubs.unsubscribe();
  }
}
