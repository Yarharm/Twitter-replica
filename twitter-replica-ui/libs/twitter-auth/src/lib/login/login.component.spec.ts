import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterLoginFormComponent } from './login.component';

describe('TwitterLoginFormComponent', () => {
  let component: TwitterLoginFormComponent;
  let fixture: ComponentFixture<TwitterLoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterLoginFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
