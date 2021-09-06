import { Component, OnInit } from '@angular/core';

export interface FeedbackSatisfacton {
  feedbackname: string
  satisfaction: number
  }

const ELEMENT_DATA: FeedbackSatisfacton[] = [
  {feedbackname: 'genaral', satisfaction: 1.0079},

];

@Component({
  selector: 'app-feedback-analytics',
  templateUrl: './feedback-analytics.component.html',
  styleUrls: ['./feedback-analytics.component.css']
})
export class FeedbackAnalyticsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['feedbackname', 'satisfaction'];
  dataSource = ELEMENT_DATA;

}
