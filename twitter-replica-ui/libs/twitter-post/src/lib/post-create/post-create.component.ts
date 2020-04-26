import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PostService,
  PostModel,
  mimeTypeValidator,
} from 'libs/twitter-core/src';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  form: FormGroup;
  imageURL: string;
  private createMode = true;
  private postId: string;

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      descripton: new FormControl(null),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      media: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeTypeValidator],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.createMode = false;
        this.postId = paramMap.get('postId');
        this.currentPost = this.postService.getPost(this.postId);
        this.form.patchValue({
          title: this.currentPost.title,
          description: this.currentPost.description,
          content: this.currentPost.content,
          media: this.currentPost.mediaPath,
        });
      } else {
        this.createMode = true;
        this.postId = null;
      }
    });
  }

  onSubmitPost() {
    if (this.form.invalid) {
      return;
    }
    if (this.createMode) {
      this.postService.addPost(
        this.form.value.title,
        this.form.value.descripton,
        this.form.value.content,
        this.form.value.media
      );
      this.form.reset();
    } else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.descripton,
        this.form.value.content,
        this.form.value.media
      );
    }
    this.router.navigate(['/']);
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ media: file });
    this.form.get('media').updateValueAndValidity();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imageURL = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
  }
}
