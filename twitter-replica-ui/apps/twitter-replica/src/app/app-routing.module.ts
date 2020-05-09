import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwitterLoginRoutes, TwitterSignupRoutes } from '@twitter-replica/auth';
import { TwitterPostRoutes } from '@twitter-replica/post';
import { TwitterUserRoutes } from '@twitter-replica/user';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', children: TwitterLoginRoutes },
  { path: 'signup', children: TwitterSignupRoutes },
  { path: 'user/:username', children: TwitterUserRoutes },
  { path: 'user/:username/post', children: TwitterPostRoutes },
  // { path: '**', component:  USER DOES NOT EXISTS COMPONENT },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
