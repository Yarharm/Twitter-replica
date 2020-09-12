import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { cloneDeep } from 'lodash';
import {
  UserModel,
  FollowModel,
  UserService,
  AuthService,
  FanOutService,
} from 'libs/twitter-core/src';
import { Subscription } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'twitter-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.scss'],
})
export class TwitterUserHomepageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  currentUser: any;
  usernamePrefix: string;
  authStatus: boolean;
  userId: string;
  isFollowed: boolean;
  authTokenSubs: Subscription;
  currentUserSubs: Subscription;
  followingUsersSubs: Subscription;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly fanOutService: FanOutService,
    private readonly route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // User
    this.currentUser = this.userService.getCurrentUser();
    this.currentUserSubs = this.userService
      .getCurrentUserListener()
      .subscribe((user: UserModel) => {
        this.currentUser = user;
        this.form.patchValue({
          coverImage: this.currentUser.coverImage,
          avatar: this.currentUser.avatar,
          bio: this.currentUser.bio,
          name: this.currentUser.name,
        });
      });

    // Auth
    this.authStatus = this.authService.getAuthStatus();
    this.userId = this.authService.getUserId();
    this.authTokenSubs = this.authService
      .getAuthTokenListener()
      .subscribe((hasAuthToken: boolean) => {
        this.authStatus = hasAuthToken;
        this.userId = this.authService.getUserId();
      });

    // Active route
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.usernamePrefix = paramMap.get('username');

      this.userService.getUser(this.usernamePrefix);
    });

    // Follower
    this.followingUsersSubs = this.fanOutService
      .getFollowingUsersListener()
      .subscribe((users: FollowModel[]) => {
        this.isFollowed =
          users.filter((user) => user.usernamePrefix === this.usernamePrefix)
            .length > 0;
      });
    if (this.authStatus) {
      this.fanOutService.getFollowingUsers();
    }

    this.form = new FormGroup({
      coverImage: new FormControl(null, {
        validators: [Validators.required],
      }),
      avatar: new FormControl(null, {
        validators: [Validators.required],
      }),
      bio: new FormControl(null, {}),
      name: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onFollowUser() {
    this.fanOutService.followUser(this.usernamePrefix);
    this.isFollowed = true;
  }

  onUnfollowUser() {
    this.fanOutService.unfollowUser(this.usernamePrefix);
    this.isFollowed = false;
  }

  onSetupProfile() {
    const dialogRef = this.dialog.open(TwitterUserProfileUpdateComponent, {
      data: cloneDeep(this.form),
    });

    dialogRef.afterClosed().subscribe((profileForm: FormGroup) => {
      if (profileForm) {
        this.form = profileForm;
        this.userService.updateUser(
          this.currentUser.id,
          this.form.value.name,
          this.form.value.bio,
          this.form.value.avatar,
          this.form.value.coverImage
        );
      }
    });
  }

  ngOnDestroy() {
    this.authTokenSubs.unsubscribe();
    this.currentUserSubs.unsubscribe();
  }
}

@Component({
  selector: 'twitter-user-profile',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss'],
})
export class TwitterUserProfileUpdateComponent {
  avatarImageURL: string;
  coverImageURL: string;
  constructor(
    public dialogRef: MatDialogRef<TwitterUserProfileUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: FormGroup
  ) {}

  onAvatarImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.formData.patchValue({ avatar: file });
    this.formData.get('avatar').updateValueAndValidity();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.avatarImageURL = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
  }

  onCoverImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.formData.patchValue({ coverImage: file });
    this.formData.get('coverImage').updateValueAndValidity();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.coverImageURL = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
