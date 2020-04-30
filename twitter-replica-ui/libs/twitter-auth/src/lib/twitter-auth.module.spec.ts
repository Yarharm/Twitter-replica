import { async, TestBed } from '@angular/core/testing';
import { TwitterAuthModule } from './twitter-auth.module';

describe('TwitterAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TwitterAuthModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TwitterAuthModule).toBeDefined();
  });
});
