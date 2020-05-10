import { Component, OnInit } from '@angular/core';
import {
  PostService,
  BackendPostModel,
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
    public route: ActivatedRoute
  ) {}

  content: string;
  form: FormGroup;
  imageURL: string;
  expandEmpojiBar = false;
  private createMode = true;
  private postId: string;

  ngOnInit() {
    this.form = new FormGroup({
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
        this.postService
          .getPost(this.postId)
          .subscribe((currentPost: BackendPostModel) => {
            this.form.patchValue({
              content: currentPost.content,
              media: currentPost.mediaPath,
            });
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
      this.postService.addPost(this.form.value.content, this.form.value.media);
      this.form.reset();
    } else {
      this.postService.updatePost(
        this.postId,
        this.form.value.content,
        this.form.value.media
      );
    }
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

  addEmoji(event: { emoji: any; event: Event }) {
    const currentContent = this.form.controls.content.value
      ? this.form.controls.content.value
      : '';
    this.form.patchValue({
      content: currentContent + event.emoji.native,
    });
  }
}
