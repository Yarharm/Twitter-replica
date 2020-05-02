import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [httpInterceptorProviders],
  exports: [MatToolbarModule, HeaderComponent, HttpClientModule],
})
export class TwitterCoreModule {}
