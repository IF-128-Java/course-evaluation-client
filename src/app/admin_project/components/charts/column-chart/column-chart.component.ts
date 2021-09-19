import { Component, ViewChild, OnInit } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from 'ng-apexcharts';
import {ChartUsersInCourseDto} from '../../../models/chart-users-in-course-dto.model';
import {ChartsService} from '../../../services/charts.service';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
};

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  chartDataList: ChartUsersInCourseDto[] = [];
  chartData: any = [];
  chartLabels: any = [];

  constructor(private chartService: ChartsService) { }

  ngOnInit(): void {

    this.chartService.getUsersInCourseChart()
      .subscribe(
        data => {
          this.chartDataList = data;
          console.log(this.chartDataList);
          for (let i = 0; this.chartDataList.length > i; i++) {
            this.chartData[i] = this.chartDataList[i].coursesUsers;
            this.chartLabels[i] = this.chartDataList[i].courseName;
          }
          console.log(this.chartData);
          console.log(this.chartLabels);

          this.chartOptions = {
            series: [
              {
                name: "users-in-course",
                data: this.chartData
              }
            ],
            chart: {
              type: "bar",
              height: 500,
              width: 800,
              toolbar: {
                show: true,
              },

            },
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: this.chartLabels
            }
          };
        })

  }

}
