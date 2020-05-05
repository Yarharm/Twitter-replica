import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuard } from '@twitter-replica/core';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { TwitterPostCreateComponent } from './post-create/post-create.component';
import { TwitterPostListComponent } from './post-list/post-list.component';

export const TwitterPostRoutes: Route[] = [
  {
    path: '',
    component: TwitterPostListComponent,
  },
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
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    PickerModule,
  ],
  declarations: [TwitterPostCreateComponent, TwitterPostListComponent],
  exports: [
    TwitterPostCreateComponent,
    TwitterPostListComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatPaginatorModule,
    MatIconModule,
    PickerModule,
  ],
})
export class TwitterPostModule {}
