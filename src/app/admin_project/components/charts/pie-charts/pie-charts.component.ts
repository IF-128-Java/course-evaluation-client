import { Component, OnInit, ViewChild} from '@angular/core';

import {ChartsService} from '../../../services/charts.service';
import {Router} from '@angular/router';
import {ChartUsersRolesDto} from '../../../models/chart-users-roles-dto.model';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTheme,
  ApexTitleSubtitle, ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
  theme: ApexTheme | any;
  title: ApexTitleSubtitle | any;
};

@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.css']
})
export class PieChartsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  chartDataList: ChartUsersRolesDto[] = [];
  chartData: ChartUsersRolesDto;
  public chartOptions: Partial<ChartOptions>;

  constructor(private chartService: ChartsService, private router: Router) {
  }

  ngOnInit(): void {
    this.chartService.getUsersRolesChart()
      .subscribe(
    data => {
      this.chartDataList = data;
      for (let i = 0; this.chartDataList.length > i; i++) {
        this.chartData = this.chartDataList[i];
      }
      let adminRoles = <number>this.chartData['adminRoles'];
      let teacherRoles = <number>this.chartData['teacherRoles'];
      let studentsRoles = <number>this.chartData['studentRoles'];
      let noRoles = <number>this.chartData['noRoles'];
      console.log(noRoles);


      this.chartOptions = {
        series: [adminRoles, teacherRoles, studentsRoles, noRoles],
        chart: {
          width: "130%",
          type: "pie"
        },
        labels: [
          "Admins",
          "Teachers",
          "Students",
          "Without any role"
        ],
        theme: {
          monochrome: {
            enabled: true
          }
        },
        title: {
          text: "Users Roles Chart"
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    })
  }
}
