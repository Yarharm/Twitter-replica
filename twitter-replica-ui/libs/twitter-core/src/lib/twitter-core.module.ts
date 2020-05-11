import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../../material.module';
import { httpInterceptorProviders } from './http-interceptors';
import { AuthGuard } from './http-guards';
import { HeaderComponent } from './header/header.component';
import { TwitterDialogErrorComponent } from './dialog-error/dialog-error.component';

@NgModule({
  declarations: [HeaderComponent, TwitterDialogErrorComponent],
  imports: [CommonModule, RouterModule, MaterialModule, HttpClientModule],
  providers: [httpInterceptorProviders, AuthGuard],
  entryComponents: [TwitterDialogErrorComponent],
  exports: [HeaderComponent],
})
export class TwitterCoreModule {}
