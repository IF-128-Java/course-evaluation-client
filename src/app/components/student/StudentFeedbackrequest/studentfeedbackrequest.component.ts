import {Component, OnInit, ViewChild} from '@angular/core';
import {MyGroupService} from '../../../services/student/my-group.service';
import {CoursesService} from '../../../services/courses.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Feedbackrequestwithstudent} from "../../../models/student/feedbackrequestwithstudent.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {TokenStorageService} from "../../../auth/token-storage.service";

@Component({
  selector: 'app-my-feedbackrequest-courses',
  templateUrl: './studentfeedbackrequest.component.html',
  styleUrls: ['./studentfeedbackrequest.component.css']
})
export class StudentFeedbackrequetComponent implements OnInit{

  public displayedColumns: string[] = ['Description', 'StartDate', 'EndDate', 'Feedback'];
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

  public feedbackRequest: Feedbackrequestwithstudent[] = [];
  listData: MatTableDataSource<any> = new MatTableDataSource<any>();
  courseId: number;
  courseName: string;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private MyGroupService: MyGroupService,
    private route: ActivatedRoute,
    private courseService: CoursesService) {
  }

  activeItem: number | undefined;

  onSelect(item: number): void {
    this.activeItem = item;
  }

  ngOnInit(): void {
    this.courseId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.courseService.get(+this.courseId)
      .subscribe(data =>{
        this.courseName = data.courseName;
        this.courseId = data.courseId;
        this.courseId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
        this.getFeedbackRequests(+this.courseId, Number(this.tokenStorage.getId()));
      })
  }

  getFeedbackRequests(idc: any, ids: any): void {
    this.MyGroupService.getFbRequests(idc, ids).subscribe(data => {
        this.feedbackRequest = data;
        this.listData = new MatTableDataSource(this.feedbackRequest);
        setTimeout(() => this.listData.paginator = this.paginator);
      },
      error => {
        console.log(error);
      }
    );
  }

  viewFeedback(id: any) {
    this.router.navigateByUrl('/feedback/'+id);
  }
  addFeedback(id: any) {
    this.router.navigateByUrl('/addfeedback/course/'+this.courseId+'/feedbackrequest/'+id);
  }
}

