import { async, TestBed } from '@angular/core/testing';
import { TwitterCoreModule } from './twitter-core.module';

describe('CoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TwitterCoreModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TwitterCoreModule).toBeDefined();
  });
});
