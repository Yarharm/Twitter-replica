import { async, TestBed } from '@angular/core/testing';
import { TwitterFriendshipModule } from './twitter-friendship.module';

describe('TwitterUserModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TwitterFriendshipModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TwitterFriendshipModule).toBeDefined();
  });
});
