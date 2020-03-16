import { Component } from '@angular/core';

@Component({
  selector: 'twitter-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class TwitterPostCreateComponent {
  enteredValue: string;
  post: string;

  onAddPost() {
    this.post = this.enteredValue;
  }
}
