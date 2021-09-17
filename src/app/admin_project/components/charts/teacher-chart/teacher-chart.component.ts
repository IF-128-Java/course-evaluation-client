import { Component, OnInit } from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';

import {ChartsService} from '../../../services/charts.service';
import {ChartTeacherRateDtoModel} from '../../../models/chart-teacher-rate-dto.model';

@Component({
  selector: 'app-teacher-chart',
  templateUrl: './teacher-chart.component.html',
  styleUrls: ['./teacher-chart.component.css']
})
export class TeacherChartComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];

  chartDataList: ChartTeacherRateDtoModel[] = [];
  chartData: any = [];
  chartLabels: any = [];

  constructor(private chartService: ChartsService) {
  }

  ngOnInit(): void {
    this.chartService.getTeacherRateChart()
      .subscribe(
        response => {
          this.chartDataList = response;
          for (let i = 0; this.chartDataList.length > i; i++) {
            this.chartData[i] = this.chartDataList[i].teacherRate;
            this.chartLabels[i] = this.chartDataList[i].teacher;
          }
        })
  }
}
