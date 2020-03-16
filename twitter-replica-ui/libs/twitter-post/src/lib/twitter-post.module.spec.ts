import { async, TestBed } from '@angular/core/testing';
import { TwitterPostModule } from './twitter-post.module';

describe('TwitterPostModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TwitterPostModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TwitterPostModule).toBeDefined();
  });
});
