import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterUserHomepageComponent } from './user-homepage.component';

describe('TwitterUserHomepageComponent', () => {
  let component: TwitterUserHomepageComponent;
  let fixture: ComponentFixture<TwitterUserHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterUserHomepageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterUserHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
