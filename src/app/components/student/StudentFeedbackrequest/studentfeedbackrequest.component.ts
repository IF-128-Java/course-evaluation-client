import {Component, OnInit, ViewChild} from '@angular/core';
import {MyGroupService} from '../../../services/student/my-group.service';
import {CoursesService} from '../../../services/courses.service';
import {ActivatedRoute} from "@angular/router";
import {FeedbackRequest} from "../../../models/feedbackrequest.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-my-feedbackrequest-courses',
  templateUrl: './studentfeedbackrequest.component.html',
  styleUrls: ['./studentfeedbackrequest.component.css']
})
export class StudentFeedbackrequetComponent implements OnInit{

  public displayedColumns: string[] = ['Description', 'StartDate', 'EndDate', 'Feedback', 'Delete'];
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

  public feedbackRequest: FeedbackRequest[] = [];
  listData: MatTableDataSource<any> = new MatTableDataSource<any>();
  courseId: number;
  courseName: string;

  constructor(
    private MyGroupService: MyGroupService,
    private route: ActivatedRoute,
    private courseService: CoursesService) {
  }

  activeItem: number | undefined;

  onSelect(item: number): void {
    this.activeItem = item;
  }

  ngOnInit(): void {
    console.log(this.courseId);
    this.courseId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.courseService.get(+this.courseId)
      .subscribe(data =>{
        this.courseName = data.courseName;
        this.courseId = data.courseId;
        this.courseId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
        this.getFeedbackRequests(+this.courseId);
      })
  }

  getFeedbackRequests(id: any): void {
    this.MyGroupService.getFbRequests(id).subscribe(data => {
        this.feedbackRequest = data;
        console.log(this.feedbackRequest);
        this.listData = new MatTableDataSource(this.feedbackRequest);
        setTimeout(() => this.listData.paginator = this.paginator);
      },
      error => {
        console.log(error);
      }
    );
  }

  addFeedback(id: any) {
    //this.router.navigateByUrl('/feedback_request/course/'+id)
  }
  removeFeedback(id: any) {
    //this.router.navigateByUrl('/feedback_request/course/'+id)
  }
}

