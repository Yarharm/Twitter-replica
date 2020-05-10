import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TwitterDialogErrorComponent } from '../dialog-error/dialog-error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error.message || 'An unknown error occured';
        this.dialog.open(TwitterDialogErrorComponent, {
          width: '250px',
          data: { message: errorMessage },
        });
        return throwError(err);
      })
    );
  }
}
