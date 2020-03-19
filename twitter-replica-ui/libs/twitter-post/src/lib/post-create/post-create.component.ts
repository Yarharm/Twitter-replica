import { Component } from '@angular/core';
import { PostService } from 'libs/twitter-core/src';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'twitter-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class TwitterPostCreateComponent {
  constructor(private readonly postService: PostService) {}

  title: string;
  descripton: string;
  content: string;

  onAddPost(createPostForm: NgForm) {
    if (createPostForm.invalid) {
      return;
    }
    this.postService.addPost(
      createPostForm.value.title,
      createPostForm.value.descripton,
      createPostForm.value.content
    );
    createPostForm.resetForm();
  }
}
