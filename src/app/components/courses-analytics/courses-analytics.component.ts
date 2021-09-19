import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import {Coursessatisfaction} from "../../models/coursessatisfaction.model";
import {TokenStorageService} from "../../auth/token-storage.service";
import {AnalystService} from '../../services/analyst.service';

@Component({
  selector: 'app-courses-analytics',
  templateUrl: './courses-analytics.component.html',
  styleUrls: ['./courses-analytics.component.css']
})
export class CoursesAnalyticsComponent implements OnInit {

  listData: MatTableDataSource<any> = new MatTableDataSource<any>();
  satisfactions: Coursessatisfaction[];

  public displayedColumns: string[] = ['CourseId', 'FeedbackRequestId', 'Satisfaction'];
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;


  constructor( private tokenStorage: TokenStorageService,
               private analystService: AnalystService) { }


  ngOnInit(): void {
    this.getCoursesSatisfaction();
  }

  getCoursesSatisfaction(): void {

    this.analystService.get().subscribe(data => {
        this.satisfactions = data;
        this.listData = new MatTableDataSource(this.satisfactions);
        setTimeout(() => this.listData.paginator = this.paginator);
      }
    );




}
}
