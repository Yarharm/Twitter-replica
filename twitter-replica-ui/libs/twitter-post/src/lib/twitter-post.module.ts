import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { TwitterPostCreateComponent } from './post-create/post-create.component';
import { TwitterPostListComponent } from './post-list/post-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule
  ],
  declarations: [TwitterPostCreateComponent, TwitterPostListComponent],
  exports: [
    TwitterPostCreateComponent,
    TwitterPostListComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule
  ]
})
export class TwitterPostModule {}
