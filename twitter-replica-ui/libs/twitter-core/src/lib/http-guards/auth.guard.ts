import { CanActivate } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { URL } from '../http-services/urls';
import { Observable } from 'rxjs';
import { AuthService } from '../http-services';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const authStatus = this.authService.getAuthStatus();

    if (!authStatus) {
      this.router.navigate([URL.LOGIN]);
    }
    return true;
  }
}
