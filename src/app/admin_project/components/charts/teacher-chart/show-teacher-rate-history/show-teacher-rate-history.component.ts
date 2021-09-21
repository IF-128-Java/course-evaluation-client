import {Component, Inject, OnInit} from '@angular/core';
import {ChartsService} from '../../../../services/charts.service';
import {ChartTeacherQuestionRateDtoModel} from '../../../../models/chart-teacher-question-rate-dto.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-show-teacher-rate-history',
  templateUrl: './show-teacher-rate-history.component.html',
  styleUrls: ['./show-teacher-rate-history.component.css']
})
export class ShowTeacherRateHistoryComponent implements OnInit {

  public displayedColumns: string[] = ['Question', 'Rate'];
  chartDataList: ChartTeacherQuestionRateDtoModel[] = [];
  avarageRateArr : number[]=[];
  avarageRate: string;

  constructor(private chartService: ChartsService, @Inject(MAT_DIALOG_DATA) public data: {teacherId: any}) {
  }

  ngOnInit(): void {
    this.chartService.getTeacherQuestionRateData(this.data.teacherId)
      .subscribe(
        response => {
          this.chartDataList = response;
          this.chartDataList.map((r:any)=> this.avarageRateArr.push(r.rate));
          this.avarageRate = this.average(this.avarageRateArr, this.avarageRateArr.length).toFixed(2);
        })
  }
   average(a: number[], n:number)
  {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += a[i];
    return parseFloat(String(sum / n));
  }
}
