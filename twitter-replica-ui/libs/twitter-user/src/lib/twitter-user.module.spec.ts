import { async, TestBed } from '@angular/core/testing';
import { TwitterUserModule } from './twitter-user.module';

describe('TwitterUserModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TwitterUserModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TwitterUserModule).toBeDefined();
  });
});
