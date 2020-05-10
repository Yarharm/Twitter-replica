import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterDialogErrorComponent } from './dialog-error.component';

describe('TwitterDialogErrorComponent', () => {
  let component: TwitterDialogErrorComponent;
  let fixture: ComponentFixture<TwitterDialogErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterDialogErrorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterDialogErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
