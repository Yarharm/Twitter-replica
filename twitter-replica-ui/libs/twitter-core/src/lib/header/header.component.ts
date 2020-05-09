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
  usernamePrefix: string;
  private authTokenSubs = new Subscription();
  private usernamePrefixSubs = new Subscription();

  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.authStatus = this.authService.getAuthStatus();
    this.authTokenSubs = this.authService
      .getAuthTokenListener()
      .subscribe((hasAuthToken: boolean) => {
        this.authStatus = hasAuthToken;
      });

    this.usernamePrefix = this.authService.getUsernamePrefix();
    this.usernamePrefixSubs = this.authService
      .getUsernamePrefixListener()
      .subscribe((prefix: string) => {
        this.usernamePrefix = prefix;
      });
  }

  onLogOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authTokenSubs.unsubscribe();
    this.usernamePrefixSubs.unsubscribe();
  }
}
