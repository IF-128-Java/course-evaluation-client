import {Component, OnInit} from '@angular/core';
import {FeedbackRequest} from '../../models/feedbackrequest.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FeedbackrequestService} from '../../services/feedbackrequest.service';
import {CoursesService} from '../../services/courses.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-feedbackrequest-list',
  templateUrl: './feedbackrequest-list.component.html',
  styleUrls: ['./feedbackrequest-list.component.css']
})
export class FeedbackrequestListComponent implements OnInit {
  public feedbackRequest: FeedbackRequest[] = [];
  displayedColumns: string[] = ['Id', 'Description', 'Start Date', 'End Date', 'Actions'];
  courseName?: string;
  pageEvent?: PageEvent;
  pageIndex?: number;
  pageSize?: number;
  length?: number;
  courseId?: number;

  constructor(private feedbackRequestService: FeedbackrequestService, private route: ActivatedRoute, private courseService: CoursesService, private router: Router) {
  }

  ngOnInit(): void {
    this.courseId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.courseService.get(this.courseId)
      .subscribe(data =>{
        this.courseName = data.courseName;
      })
    var event = new PageEvent();
    event.pageIndex = 0;
    event.pageSize = 10;
    this.getFeedbackRequests(event);
  }

  addFeedbackRequest() {
    this.router.navigateByUrl('feedback_request/add/' + this.courseId)
  }

  getFeedbackRequests(event: PageEvent) {
    this.feedbackRequestService.getFbRequests(event, this.courseId).subscribe(
      response => {
        this.feedbackRequest = response.content;
        this.pageIndex = response.pageIndex;
        this.pageSize = response.size;
        this.length = response.totalElements;
      }
    );
    return event;
  }

  showFeedbacks(feedbackRequestId: any) {
    this.router.navigateByUrl('/courses/'+this.courseId+'/feedback_requests/' + feedbackRequestId)
  }
}
