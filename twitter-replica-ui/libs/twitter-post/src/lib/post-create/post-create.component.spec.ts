import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterPostCreateComponent } from './post-create.component';

describe('TwitterPostComponent', () => {
  let component: TwitterPostCreateComponent;
  let fixture: ComponentFixture<TwitterPostCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterPostCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterPostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
