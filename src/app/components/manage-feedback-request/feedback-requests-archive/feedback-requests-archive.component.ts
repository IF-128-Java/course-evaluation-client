import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {FeedbackrequestService} from '../../../services/feedbackrequest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CoursesService} from '../../../services/courses.service';
import {FeedbackRequest} from '../../../models/feedbackrequest.model';
import {FbrStatus} from '../../../models/fbr-status.model';

@Component({
  selector: 'app-feedback-requests-archive',
  templateUrl: './feedback-requests-archive.component.html',
  styleUrls: ['./feedback-requests-archive.component.css']
})
export class FeedbackRequestsArchiveComponent implements OnInit {
  public feedbackRequest: FeedbackRequest[] = [];
  displayedColumns: string[] = ['Description', 'Start Date', 'End Date', 'Actions'];
  courseName?: string;
  pageEvent?: PageEvent;
  pageIndex?: number;
  pageSize?: number;
  length?: number;
  courseId?: number;

  constructor(private feedbackRequestService: FeedbackrequestService, private route: ActivatedRoute, private courseService: CoursesService, private router: Router) { }

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

  getFeedbackRequests(event: PageEvent) {
    this.feedbackRequestService.getFbRequests(event, this.courseId).subscribe(
      response => {
        this.feedbackRequest = response.content.filter((f:FeedbackRequest)=>f.status===FbrStatus.ARCHIVE);
        this.pageIndex = response.pageIndex;
        this.pageSize = response.size;
        this.length = response.totalElements;
      }
    );
    return event;
  }

  delete(id: number) {
    this.feedbackRequestService.delete(id).subscribe();
    this.ngOnInit();
  }

}
