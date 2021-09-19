import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexChartComponent } from './complex-chart.component';

describe('ComplexChartComponent', () => {
  let component: ComplexChartComponent;
  let fixture: ComponentFixture<ComplexChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplexChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
