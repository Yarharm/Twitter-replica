import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../../material.module';
import { httpInterceptorProviders } from './http-interceptors';
import { AuthGuard } from './http-guards';
import { HeaderComponent } from './header/header.component';
import { TwitterDialogErrorComponent } from './dialog-error/dialog-error.component';
import { HomepageAuthComponent } from './homepage-auth/homepage-auth.component';

export const TwitterCoreRoutes: Route[] = [
  {
    path: '',
    component: HomepageAuthComponent,
  },
];

@NgModule({
  declarations: [
    HeaderComponent,
    TwitterDialogErrorComponent,
    HomepageAuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
  providers: [httpInterceptorProviders, AuthGuard],
  entryComponents: [TwitterDialogErrorComponent],
  exports: [HeaderComponent, HomepageAuthComponent],
})
export class TwitterCoreModule {}
