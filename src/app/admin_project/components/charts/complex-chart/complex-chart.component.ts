import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStates,
  ApexGrid,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import {ChartsService} from '../../../services/charts.service';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

var colors = [
  "#008FFB",
  "#00E396",
  "#f66010",
  "#FF4560",
  "#775DD0",
  "#00D9E9",
  "#FF66C3"
];

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  grid: ApexGrid | any;
  subtitle: ApexTitleSubtitle | any;
  colors: string[] | any;
  states: ApexStates | any;
  title: ApexTitleSubtitle | any;
  legend: ApexLegend | any;
  tooltip: any; //ApexTooltip;
};

declare global {
  interface Window {
    Apex: any;
  }
}

window.Apex = {
  chart: {
    toolbar: {
      show: false
    }
  },
  tooltip: {
    shared: false
  },
  legend: {
    show: false
  }
};


@Component({
  selector: 'app-complex-chart',
  templateUrl: './complex-chart.component.html',
  styleUrls: ['./complex-chart.component.css']
})
export class ComplexChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartQuarterOptions: Partial<ChartOptions>;

  constructor(private chartService: ChartsService) { }

  ngOnInit(): void {


    this.chartService.getComplexChartData()
      .subscribe(
        data => {
          console.log(data);


          this.chartOptions = {
            series: [
              {
                name: "Groups",
                data: data
              }
            ],
            chart: {
              id: "barGroups",
              height: 500,
              width: "100%",
              type: "bar",
              toolbar: {
                show: true,
              },
              events: {
                // @ts-ignore
                dataPointSelection: (e, chart, opts) => {
                  var quarterChartEl = document.querySelector("#chart-quarter");
                  var yearChartEl = document.querySelector("#chart-year");

                  if (opts.selectedDataPoints[0].length === 1) {
                    // @ts-ignore
                    if (quarterChartEl.classList.contains("active")) {
                      this.updateQuarterChart(chart, "barStudents");
                    } else {
                      // @ts-ignore
                      yearChartEl.classList.add("chart-quarter-activated");
                      // @ts-ignore
                      quarterChartEl.classList.add("active");
                      this.updateQuarterChart(chart, "barStudents");
                    }
                  } else {
                    this.updateQuarterChart(chart, "barStudents");
                  }

                  if (opts.selectedDataPoints[0].length === 0) {
                    // @ts-ignore
                    yearChartEl.classList.remove("chart-quarter-activated");
                    // @ts-ignore
                    quarterChartEl.classList.remove("active");
                  }
                },
                // @ts-ignore
                updated: (chart) => {
                  this.updateQuarterChart(chart, "barQuarter");
                }
              }
            },
            plotOptions: {
              bar: {
                distributed: true,
                horizontal: true,
                barHeight: "75%",
                dataLabels: {
                  position: "bottom"
                }
              }
            },
            dataLabels: {
              enabled: true,
              textAnchor: "start",
              style: {
                colors: ["#fff"]
              },
              // @ts-ignore
              formatter: function(val, opt) {
                return opt.w.globals.labels[opt.dataPointIndex];
              },
              offsetX: 0,
              dropShadow: {
                enabled: true
              }
            },

            colors: colors,

            states: {
              normal: {
                filter: {
                  type: "desaturate"
                }
              },
              active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                  type: "darken",
                  value: 1
                }
              }
            },
            tooltip: {
              x: {
                show: false
              },
              y: {
                title: {
                  // @ts-ignore
                  formatter: function(val, opts) {
                    return opts.w.globals.labels[opts.dataPointIndex];
                  }
                }
              }
            },
            title: {
              text: "Number of courses in a group",
              offsetX: 15
            },
            subtitle: {
              text: "(Click on bar to see details)",
              offsetX: 20
            },
            yaxis: {
              labels: {
                show: false
              }
            }
          };

          this.chartQuarterOptions = {
            series: [
              {
                name: "quarter",
                data: []
              }
            ],
            chart: {
              id: "barStudents",
              height: 500,
              width: "100%",
              type: "bar",
              toolbar: {
                show: true,
              },
              stacked: true
            },
            plotOptions: {
              bar: {
                columnWidth: "50%",
                horizontal: false
              }
            },
            legend: {
              show: false
            },
            grid: {
              yaxis: {
                lines: {
                  show: false
                }
              },
              xaxis: {
                lines: {
                  show: true
                }
              }
            },
            yaxis: {
              labels: {
                show: true
              }
            },
            title: {
              text: "Students feedbacks",
              offsetX: 20
            },
            tooltip: {
              x: {
                // @ts-ignore
                formatter: function(val, opts) {
                  return opts.w.globals.seriesNames[opts.seriesIndex];
                }
              },
              y: {
                title: {
                  // @ts-ignore
                  formatter: function(val, opts) {
                    return opts.w.globals.labels[opts.dataPointIndex];
                  }
                }
              }
            }
          };
        })

  }

  // @ts-ignore
  public updateQuarterChart(sourceChart, destChartIDToUpdate) {
    var series = [];
    var seriesIndex = 0;
    var colors = [];

    if (sourceChart.w.globals.selectedDataPoints[0]) {
      var selectedPoints = sourceChart.w.globals.selectedDataPoints;
      for (var i = 0; i < selectedPoints[seriesIndex].length; i++) {
        var selectedIndex = selectedPoints[seriesIndex][i];
        var yearSeries = sourceChart.w.config.series[seriesIndex];
        series.push({
          name: yearSeries.data[selectedIndex].x,
          data: yearSeries.data[selectedIndex].quarters
        });
        colors.push(yearSeries.data[selectedIndex].color);
      }

      if (series.length === 0)
        series = [
          {
            data: []
          }
        ];

      return window.ApexCharts.exec(destChartIDToUpdate, "updateOptions", {
        series: series,
        colors: colors,
        fill: {
          colors: colors
        }
      });
    }
  }

}
