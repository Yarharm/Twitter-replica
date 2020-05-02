import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'libs/twitter-core/src';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class TwitterLoginFormComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
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
      this.authService.loginUser(
        this.form.value.username,
        this.form.value.password
      );
      this.form.reset();
    }
  }
}
