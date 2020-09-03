import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { TwitterFollowComponent } from './friendships/follow/follow.component';

export const TwitterFriendshipRoutes: Route[] = [
  {
    path: 'following',
    component: TwitterFollowComponent,
  },
  {
    path: 'follower',
    component: TwitterFollowComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule],
  declarations: [TwitterFollowComponent],
  exports: [TwitterFollowComponent],
})
export class TwitterFriendshipModule {}
