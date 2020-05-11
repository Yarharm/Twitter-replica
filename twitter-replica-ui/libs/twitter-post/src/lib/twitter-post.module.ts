import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { AuthGuard } from '@twitter-replica/core';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MaterialModule } from '../../../material.module';
import { TwitterPostCreateComponent } from './post-create/post-create.component';
import { TwitterPostListComponent } from './post-list/post-list.component';

export const TwitterPostRoutes: Route[] = [
  {
    path: 'create',
    component: TwitterPostCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:postId',
    component: TwitterPostCreateComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    PickerModule,
  ],
  declarations: [TwitterPostCreateComponent, TwitterPostListComponent],
  exports: [TwitterPostCreateComponent, TwitterPostListComponent],
})
export class TwitterPostModule {}
