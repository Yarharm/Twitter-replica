import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { TwitterUserHomepageComponent } from './user-homepage/user-homepage.component';
import { TwitterPostModule } from '@twitter-replica/post';

export const TwitterUserRoutes: Route[] = [
  {
    path: '',
    component: TwitterUserHomepageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TwitterPostModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatPaginatorModule,
  ],
  declarations: [TwitterUserHomepageComponent],
  exports: [TwitterUserHomepageComponent],
})
export class TwitterUserModule {}
