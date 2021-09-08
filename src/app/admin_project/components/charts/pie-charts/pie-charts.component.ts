import { Component, OnInit, ViewChild } from '@angular/core';

// @ts-ignore
import * as CanvasJS from './canvasjs.min';
import {ChartsService} from '../../../services/charts.service';
import {Router} from '@angular/router';
import {ChartUsersRolesDto} from "../../../models/chart-users-roles-dto.model";

@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.css']
})
export class PieChartsComponent implements OnInit {
  title = 'canvasjs-angular';
  chartDataList: any[] = [];
  chartData: ChartUsersRolesDto | any;
  adminR: bigint;
  studentR: number;
  noRoles: number;
  i: number = 6;
  f: number = 10;

  constructor(private chartService: ChartsService, private router: Router) {

  }


  ngOnInit(): void {
    this.chartService.getUsersRolesChart().subscribe(
      data => {
        this.chartDataList = data;
        for (let i = 0; this.chartDataList.length > i; i++) {
          this.chartData = this.chartDataList[i];
        }
        this.adminR = <bigint>this.chartData.adminRoles;
        this.studentR = parseInt(this.chartData.studentRoles);
        this.noRoles = +this.chartData.noRoles;
        console.log(this.adminR, this.studentR);
      },
      (error: any) => {console.log(error);
      })

    let dataPoints = [
      { y: this.f },
      { y: this.i },
      { y: 50 },
      { y: 65 }
      // { y: this.adminR },
      // { y: this.teacherR },
      // { y: this.studentR },
      // { y: this.noRoles }

    ];

    let chart = new CanvasJS.Chart("chartContainer",{
      animationEnabled: true,
      title:{
        text: "Pie chart for Users Roles"
      },
      data: [{
        type: "pie",
        dataPoints : dataPoints
      }]
    });
    chart.render();
  }
}
