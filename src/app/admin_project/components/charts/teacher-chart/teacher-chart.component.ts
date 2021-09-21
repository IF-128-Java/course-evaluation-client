import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';

import {ChartsService} from '../../../services/charts.service';
import {ChartTeacherRateDtoModel} from '../../../models/chart-teacher-rate-dto.model';
import {MatDialog} from '@angular/material/dialog';
import {ShowTeacherRateHistoryComponent} from './show-teacher-rate-history/show-teacher-rate-history.component';

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

  activeItem: number | undefined;
  public displayedColumns: string[] = ['Teacher', 'Rate', 'Actions'];

  constructor(private chartService: ChartsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.chartService.getTeachersRateData()
      .subscribe(
        response => {
          this.chartDataList = response;
          for (let i = 0; this.chartDataList.length > i; i++) {
            this.chartData[i] = this.chartDataList[i].teacherRate.toFixed(2);
            this.chartLabels[i] = this.chartDataList[i].teacherName;
          }
          console.log(response)
        })
  }

  onSelect(item: number): void {
    this.activeItem = item;
  }

  showHistory(teacher: any) {
    this.dialog.open(ShowTeacherRateHistoryComponent, {
      width: '800px',
      data: {teacher: teacher}
    });
  }
}
