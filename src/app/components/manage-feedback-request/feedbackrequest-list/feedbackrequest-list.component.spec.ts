import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackrequestListComponent } from './feedbackrequest-list.component';

describe('FeedbackrequestListComponent', () => {
  let component: FeedbackrequestListComponent;
  let fixture: ComponentFixture<FeedbackrequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackrequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackrequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
