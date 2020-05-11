import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from '../../../material.module';

import { TwitterUserHomepageComponent } from './user-homepage/user-homepage.component';
import { TwitterPostModule } from '@twitter-replica/post';

export const TwitterUserRoutes: Route[] = [
  {
    path: '',
    component: TwitterUserHomepageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, TwitterPostModule],
  declarations: [TwitterUserHomepageComponent],
  exports: [TwitterUserHomepageComponent],
})
export class TwitterUserModule {}
