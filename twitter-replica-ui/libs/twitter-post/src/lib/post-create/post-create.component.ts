import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService, PostModel } from 'libs/twitter-core/src';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'twitter-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class TwitterPostCreateComponent implements OnInit {
  constructor(
    private readonly postService: PostService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  title: string;
  descripton: string;
  content: string;
  currentPost: PostModel;
  private createMode = true;
  private postId: string;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.createMode = false;
        this.postId = paramMap.get('postId');
        this.currentPost = this.postService.getPost(this.postId);
      } else {
        this.createMode = true;
        this.postId = null;
      }
    });
  }

  onSubmitPost(createPostForm: NgForm) {
    if (createPostForm.invalid) {
      return;
    }
    if (this.createMode) {
      this.postService.addPost(
        createPostForm.value.title,
        createPostForm.value.descripton,
        createPostForm.value.content
      );
      createPostForm.resetForm();
    } else {
      this.postService.updatePost(
        this.postId,
        createPostForm.value.title,
        createPostForm.value.descripton,
        createPostForm.value.content
      );
    }
    this.router.navigate(['/']);
  }
}
