import {Component, OnInit} from '@angular/core';
import {Feedback} from '../../../models/feedback.model';
import {FeedbackService} from '../../../services/feedback.service';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {Student} from '../../../models/student/student.model';
import {MyGroupService} from '../../../services/student/my-group.service';
import {UserService} from '../../../admin_project/services/user.service';

@Component({
  selector: 'app-feedbacks-list',
  templateUrl: './feedbacks-list.component.html',
  styleUrls: ['./feedbacks-list.component.css']
})
export class FeedbacksListComponent implements OnInit {
  displayedColumns: string[] = ['Date', 'Student', 'Comment', 'Action'];
  public feedbacks: Feedback[] = [];
  feedbackRequestId?: number;
  pageEvent?: PageEvent;
  pageIndex?: number;
  pageSize?: number;
  length?: number;
  courseId?: any;

  constructor(private feedbackService: FeedbackService, private route: ActivatedRoute, private groupService: MyGroupService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.courseId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.feedbackRequestId = parseInt(<string>this.route.snapshot.paramMap.get('feedbackRequestsId'));
    var event = new PageEvent();
    event.pageIndex = 0;
    event.pageSize = 10;
    this.getFeedbacks(event);
  }

  getFeedbacks(event: PageEvent) {
    this.feedbackService.getFeedbacksByFeedbackRequestId(event, this.feedbackRequestId).subscribe(
      response => {
        this.feedbacks = response.content;
        this.pageIndex = response.pageIndex;
        this.pageSize = response.size;
        this.length = response.totalElements;
        this.getUsers();
      }
    );
    return event;
  }

  getUsers() {
    this.groupService.getStudentsByCourseId(this.courseId).subscribe(
      response => {
        let students: Student[] = response;
        if (students != undefined) {
          students!.forEach(st => {
            let feedback = this.feedbacks.find(f => f.studentId == st.id);
            if (feedback != undefined) {
              feedback.studentName = st.firstName + ' ' + st.lastName;
            }
          })
        }
      })
  }


  showAnswer(feedbackId:any) {
      this.router.navigateByUrl('/admin/courses/'+this.courseId+'/feedback_requests/'+this.feedbackRequestId+'/feedback/'+feedbackId)
  }

}
