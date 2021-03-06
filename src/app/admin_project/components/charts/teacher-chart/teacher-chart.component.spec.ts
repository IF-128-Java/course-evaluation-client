import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherChartComponent } from './teacher-chart.component';

describe('TeacherChartComponent', () => {
  let component: TeacherChartComponent;
  let fixture: ComponentFixture<TeacherChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
