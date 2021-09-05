import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackRequestsArchiveComponent } from './feedback-requests-archive.component';

describe('FeedbackRequestsArchiveComponent', () => {
  let component: FeedbackRequestsArchiveComponent;
  let fixture: ComponentFixture<FeedbackRequestsArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackRequestsArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackRequestsArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
