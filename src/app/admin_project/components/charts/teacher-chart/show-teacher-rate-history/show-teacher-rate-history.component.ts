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

  constructor(private chartService: ChartsService, @Inject(MAT_DIALOG_DATA) public data: {teacherId: any}) {
  }

  ngOnInit(): void {
    this.chartService.getTeacherQuestionRateData(this.data.teacherId)
      .subscribe(
        response => {
          this.chartDataList = response;
          console.log(response)
        })
  }

}
