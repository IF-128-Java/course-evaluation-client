import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeedbackrequestComponent } from './edit-feedbackrequest.component';

describe('EditFeedbackrequestComponent', () => {
  let component: EditFeedbackrequestComponent;
  let fixture: ComponentFixture<EditFeedbackrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFeedbackrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeedbackrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
