import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from 'ng-apexcharts';
import {ChartsService} from '../../../services/charts.service';
import {ChatsMessagesDto} from '../../../models/chats-messages-dto.model';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  stroke: ApexStroke | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
};

@Component({
  selector: 'app-spline-chart',
  templateUrl: './spline-chart.component.html',
  styleUrls: ['./spline-chart.component.css']
})
export class SplineChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  chartDataList: ChatsMessagesDto[] = [];

  constructor(private chartService: ChartsService) { }

  ngOnInit(): void {
    this.chartService.getSplineChartData()
      .subscribe(
        data => {
          let series1Data: any = [];
          let series2Data: any = [];
          let days: any = [];
          for (let i = 0; data.length > i; i++) {
            days[i] = data[i].days;
            series1Data[i] = data[i].teachersMessages;
            series2Data[i] = data[i].groupsMessages;
          }
          console.log(days);
          console.log(series1Data);
          console.log(series2Data);


          this.chartOptions = {
            series: [
              {
                name: "Students messages",
                data: series1Data
              },
              {
                name: "Teachers messages",
                data: series2Data
              }
            ],
            chart: {
              height: 500,
              type: "area",
              toolbar: {
                show: true,
              },

            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: "smooth"
            },
            xaxis: {
              type: "datetime",
              categories: days
            },
            tooltip: {
              x: {
                format: "dd/MM/yy HH:mm"
              }
            }
          };
        })
  }

}
