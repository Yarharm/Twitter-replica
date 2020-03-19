import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterPostListComponent } from './post-list.component';

describe('TwitterPostListComponent', () => {
  let component: TwitterPostListComponent;
  let fixture: ComponentFixture<TwitterPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterPostListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
