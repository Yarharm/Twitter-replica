import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { TwitterDialogErrorComponent } from './dialog-error/dialog-error.component';
import { httpInterceptorProviders } from './http-interceptors';
import { AuthGuard } from './http-guards';

@NgModule({
  declarations: [HeaderComponent, TwitterDialogErrorComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [httpInterceptorProviders, AuthGuard],
  entryComponents: [TwitterDialogErrorComponent],
  exports: [
    MatToolbarModule,
    HeaderComponent,
    HttpClientModule,
    MatDialogModule,
  ],
})
export class TwitterCoreModule {}
