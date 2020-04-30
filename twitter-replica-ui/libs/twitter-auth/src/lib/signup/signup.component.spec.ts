import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterSingupFormComponent } from './signup.component';

describe('TwitterLoginFormComponent', () => {
  let component: TwitterSingupFormComponent;
  let fixture: ComponentFixture<TwitterSingupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterSingupFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterSingupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
