import {Component, OnInit} from '@angular/core';
import {FeedbackRequest} from '../../../models/feedbackrequest.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FeedbackrequestService} from '../../../services/feedbackrequest.service';
import {CoursesService} from '../../../services/courses.service';
import {PageEvent} from '@angular/material/paginator';
import {FbrStatus} from '../../../models/fbr-status.model';

@Component({
  selector: 'app-feedbackrequest-list',
  templateUrl: './feedbackrequest-list.component.html',
  styleUrls: ['./feedbackrequest-list.component.css']
})
export class FeedbackrequestListComponent implements OnInit {
  public feedbackRequest: FeedbackRequest[] = [];
  displayedColumns: string[] = ['Description', 'Start Date', 'End Date', 'Actions'];
  courseName?: string;
  pageEvent?: PageEvent;
  pageIndex?: number;
  pageSize?: number;
  length?: number;
  courseId?: number;
  private date: Date;
  private year: number;
  private month: number;
  private day: number;

  constructor(private feedbackRequestService: FeedbackrequestService, private route: ActivatedRoute, private courseService: CoursesService, private router: Router) {
  }

  ngOnInit(): void {
    this.courseId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.courseService.get(this.courseId)
      .subscribe(data =>{
        this.courseName = data.courseName;
      },
        error => {
          this.router.navigateByUrl('/admin/courses')
        })
    var event = new PageEvent();
    event.pageIndex = 0;
    event.pageSize = 10;
    this.getFeedbackRequests(event);
  }

  addFeedbackRequest() {
    this.router.navigateByUrl('admin/courses/feedback_request/add/' + this.courseId)
  }

  getFeedbackRequests(event: PageEvent) {
    this.feedbackRequestService.getFbRequests(event, this.courseId).subscribe(
      response => {
        this.feedbackRequest = response.content.filter((f:FeedbackRequest)=>f.status!=FbrStatus.ARCHIVE && f.status != FbrStatus.DELETED);
        this.pageIndex = response.pageIndex;
        this.pageSize = response.size;
        this.length = response.totalElements;
      }
    );
    return event;
  }

  showFeedbacks(feedbackRequestId: any) {
    this.router.navigateByUrl('/admin/courses/'+this.courseId+'/feedback_requests/' + feedbackRequestId)
  }

  exportFeedbackInfo($event: MouseEvent) {
    console.log($event)
    $event.stopPropagation();
    $event.preventDefault();
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    this.day = this.date.getDate();
    this.date.getUTCFullYear();
    let fileName="Feedback-info("+ this.courseName + ")_"+this.day + "_" + this.month + "_" + this.year +".xlsx";

    this.courseId = parseInt(<string>this.route.snapshot.paramMap.get('id'));

    const filePath = "C:/Users/*/Downloads/";
    this.feedbackRequestService.getFeedbackInfoByCourseId(this.courseId)
      .subscribe((success) => {
          const blob = new Blob([success], {type: 'application/vnd.ms-excel'});
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob,fileName);
          } else {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        }
        ,
        err => {
          alert("Error while downloading. File Not Found on the Server");
        }
        );
  }
}
