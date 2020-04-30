import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'libs/twitter-core/src';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class TwitterSingupFormComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      username: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.createUser(
        this.form.value.email,
        this.form.value.username,
        this.form.value.password
      );
      this.form.reset();
    }
  }
}
