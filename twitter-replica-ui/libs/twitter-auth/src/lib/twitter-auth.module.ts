import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [],
})
export class TwitterAuthModule {}
