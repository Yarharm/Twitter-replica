import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageAuthComponent } from './homepage-auth.component';

describe('HomepageAuthComponent', () => {
  let component: HomepageAuthComponent;
  let fixture: ComponentFixture<HomepageAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageAuthComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
