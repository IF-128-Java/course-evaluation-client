import {Component, OnInit} from '@angular/core';
import {Feedback} from '../../../models/feedback.model';
import {FeedbackService} from '../../../services/feedback.service';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {Student} from '../../../models/student/student.model';
import {MyGroupService} from '../../../services/student/my-group.service';
import {UserService} from '../../../admin_project/services/user.service';
import {User} from '../../../models/user.model';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-feedbacks-list',
  templateUrl: './feedbacks-list.component.html',
  styleUrls: ['./feedbacks-list.component.css']
})
export class FeedbacksListComponent implements OnInit {
  displayedColumns: string[] = ['Date', 'Student', 'Comment', 'Action'];
  displayedColumnsStudents: string[] = ['Student', 'Email', 'Action'];
  public feedbacks: Feedback[] = [];
  public students: User[] = [];
  feedbackRequestId: number;
  pageEvent?: PageEvent;
  pageIndex?: number;
  pageSize?: number;
  length?: number;
  courseId?: any;
  lengthSt: any;
  pageIndexSt: any;
  pageSizeSt: any;

  constructor(private feedbackService: FeedbackService, private route: ActivatedRoute, private groupService: MyGroupService, private router: Router, private userService: UserService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.courseId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.feedbackRequestId = parseInt(<string>this.route.snapshot.paramMap.get('feedbackRequestsId'));
    var event = new PageEvent();
    event.pageIndex = 0;
    event.pageSize = 10;
    this.getFeedbacks(event);
    this.notificationService.getUsersByFeedbackRequest(this.feedbackRequestId).subscribe(userList =>
      this.students = userList)
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
          students.forEach(st => {
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

  sendLetter(email: string) {
    this.notificationService.sendNotificationToUser(this.feedbackRequestId, email).subscribe();
    alert('Notification send to ' + '|' + email + '|');
  }

  sendLetterToAllAvailableStudents(students: User[]) {
    const emails: string[] = students.map(s=>s.email);
    alert('Notification send to ' + students.map(u=>'|' + u.firstName + ' ' + u.lastName + '|'));
    this.notificationService.sendNotificationToAvaliableUsers(this.feedbackRequestId, students).subscribe()
  }
}
