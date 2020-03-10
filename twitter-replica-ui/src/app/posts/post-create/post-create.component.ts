import { Component } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
    public postInfo: string;
    public post: string;
    onUploadPost() {
        this.post = this.postInfo;
    }
}
