import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTeacherRateHistoryComponent } from './show-teacher-rate-history.component';

describe('ShowTeacherRateHistoryComponent', () => {
  let component: ShowTeacherRateHistoryComponent;
  let fixture: ComponentFixture<ShowTeacherRateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTeacherRateHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTeacherRateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
