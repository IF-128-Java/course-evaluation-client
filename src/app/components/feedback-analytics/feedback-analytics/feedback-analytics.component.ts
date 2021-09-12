import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FeedbackSatisfaction} from "../../../models/feedback-satisfaction.model";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {AnalystService} from "../../../services/analyst.service";
import {MatPaginator} from "@angular/material/paginator";

/*export interface FeedbackSatisfacton {
  feedbackname: string
  satisfaction: number
  }

const ELEMENT_DATA: FeedbackSatisfacton[] = [
  {feedbackname: 'genaral', satisfaction: 1.0079},

]; */

@Component({
  selector: 'app-feedback-analytics',
  templateUrl: './feedback-analytics.component.html',
  styleUrls: ['./feedback-analytics.component.css']
})
export class FeedbackAnalyticsComponent implements OnInit {

  listData: MatTableDataSource<any> = new MatTableDataSource<any>();
  feedbackSatisfactions: FeedbackSatisfaction[];

  constructor(private tokenStorage: TokenStorageService,
              private analystService: AnalystService) { }

  ngOnInit(): void {
    this.getFeedbackSatisfaction();
  }

  displayedColumns: string[] = ['feedbackname', 'satisfaction'];
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
    //dataSource = ELEMENT_DATA;

  getFeedbackSatisfaction(): void {

    this.analystService.getFeedbackSatisfaction().subscribe(data => {
        this.feedbackSatisfactions = data;
        this.listData = new MatTableDataSource(this.feedbackSatisfactions);
        setTimeout(() => this.listData.paginator = this.paginator);
      }
    );
  }


}
