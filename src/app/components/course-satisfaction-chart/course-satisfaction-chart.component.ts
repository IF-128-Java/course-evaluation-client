import { Component, ViewChild, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from 'ng-apexcharts';
import {Monthlycoursesatisfaction} from '../../models/monthlycoursesatisfaction.model';
import {AnalystService} from '../../services/analyst.service';


export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
};

@Component({
  selector: 'coursesatisfactionchart',
  templateUrl: './course-satisfaction-chart.component.html',
  styleUrls: ['./course-satisfaction-chart.component.css'],
})
export class CourseSatisfactionChartComponent implements OnInit{

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  monthlycoursesatisfaction: Monthlycoursesatisfaction[] = [];


  chartData: any = [];
  chartLabels: any = [];
  courseId: number;

  constructor(private analystService: AnalystService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.id;
    console.log('courseId='+this.courseId)
    this.analystService.getMonthlyCourseSatisfaction(this.courseId)
      .subscribe(
        data => {
          this.monthlycoursesatisfaction = data;
          console.log(this.monthlycoursesatisfaction);
          for (let i = 0; this.monthlycoursesatisfaction.length > i; i++) {
            this.chartData[i] = this.monthlycoursesatisfaction[i].rate;
            this.chartLabels[i] = this.monthlycoursesatisfaction[i].monthName;
          }
          console.log(this.chartData);
          console.log(this.chartLabels);

          this.chartOptions = {
            series: [
              {
                name: "monthly-satisfaction",
                data: this.chartData
              }
            ],
            chart: {
              type: "bar",
              height: 500,
              width: 800
            },
            plotOptions: {
              bar: {
                horizontal: false
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
