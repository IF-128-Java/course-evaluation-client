import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSatisfactionChartComponent } from './course-satisfaction-chart.component';

describe('CourseSatisfactionChartComponent', () => {
  let component: CourseSatisfactionChartComponent;
  let fixture: ComponentFixture<CourseSatisfactionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSatisfactionChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSatisfactionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
