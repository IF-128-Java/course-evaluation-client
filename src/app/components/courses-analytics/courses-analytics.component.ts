import {Component, OnInit, ViewChild} from '@angular/core';

import {MatTableDataSource} from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import {Coursessatisfaction} from "../../models/coursessatisfaction.model";

@Component({
  selector: 'app-courses-analytics',
  templateUrl: './courses-analytics.component.html',
  styleUrls: ['./courses-analytics.component.css']
})
export class CoursesAnalyticsComponent implements OnInit {

  listData: MatTableDataSource<any> = new MatTableDataSource<any>();

  public displayedColumns: string[] = ['CourseId', 'FeedbackRequestId', 'Satisfaction'];
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

  constructor() { }

   satisfactions: Coursessatisfaction[] = [new Coursessatisfaction(1,1,5)];
  ngOnInit(): void {
    this.getCoursesSatisfaction();
  }

  getCoursesSatisfaction(): void {

       // this.satisfactions = new Array();
        this.listData = new MatTableDataSource(this.satisfactions);
        setTimeout(() => this.listData.paginator = this.paginator);
      }



}
