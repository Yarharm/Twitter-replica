import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwitterCoreRoutes } from '@twitter-replica/core';
import { TwitterLoginRoutes, TwitterSignupRoutes } from '@twitter-replica/auth';
import { TwitterPostRoutes } from '@twitter-replica/post';
import { TwitterUserRoutes } from '@twitter-replica/user';
import { TwitterFriendshipRoutes } from '@twitter-replica/friendship';

const routes: Routes = [
  { path: '', pathMatch: 'full', children: TwitterCoreRoutes },
  { path: 'login', children: TwitterLoginRoutes },
  { path: 'signup', children: TwitterSignupRoutes },
  { path: 'user/:username', children: TwitterUserRoutes },
  { path: 'user/:username/post', children: TwitterPostRoutes },
  { path: 'user/:username/friendships', children: TwitterFriendshipRoutes },
  // { path: '**', component:  USER DOES NOT EXISTS COMPONENT },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
