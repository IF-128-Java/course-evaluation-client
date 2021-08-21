import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedbackrequestComponent } from './add-feedbackrequest.component';

describe('AddFeedbackrequestComponent', () => {
  let component: AddFeedbackrequestComponent;
  let fixture: ComponentFixture<AddFeedbackrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeedbackrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedbackrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
