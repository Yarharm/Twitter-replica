import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { TwitterLoginFormComponent } from './login/login.component';
import { TwitterSingupFormComponent } from './signup/signup.component';

export const TwitterLoginRoutes: Route[] = [
  {
    path: '',
    component: TwitterLoginFormComponent,
  },
];

export const TwitterSignupRoutes: Route[] = [
  {
    path: '',
    component: TwitterSingupFormComponent,
  },
];

@NgModule({
  declarations: [TwitterLoginFormComponent, TwitterSingupFormComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [],
})
export class TwitterAuthModule {}
