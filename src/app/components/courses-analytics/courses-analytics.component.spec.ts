import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesAnalyticsComponent } from './courses-analytics.component';

describe('CoursesAnalyticsComponent', () => {
  let component: CoursesAnalyticsComponent;
  let fixture: ComponentFixture<CoursesAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
