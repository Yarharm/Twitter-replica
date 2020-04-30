import { Injectable } from '@angular/core';
import { AuthService } from '../http-services/auth.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authType = 'Bearer ';
  constructor(private readonly auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.getAuthorizationToken();
    const authReq = req.clone({
      setHeaders: { Authorization: this.authType + authToken },
    });

    return next.handle(authReq);
  }
}
