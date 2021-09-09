import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableStudentsFeedbackrequestComponent } from './available-students-feedbackrequest.component';

describe('AvailableStudentsFeedbackrequestComponent', () => {
  let component: AvailableStudentsFeedbackrequestComponent;
  let fixture: ComponentFixture<AvailableStudentsFeedbackrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableStudentsFeedbackrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableStudentsFeedbackrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
