import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwitterLoginRoutes, TwitterSignupRoutes } from '@twitter-replica/auth';
import { TwitterPostRoutes } from '@twitter-replica/post';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'post' },
  { path: 'login', children: TwitterLoginRoutes },
  { path: 'signup', children: TwitterSignupRoutes },
  { path: 'post', children: TwitterPostRoutes },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
