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
import {NotificationMessageComponent} from '../notification-message/notification-message.component';
import {MatDialog} from '@angular/material/dialog';

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

  constructor(private feedbackService: FeedbackService, private route: ActivatedRoute, private groupService: MyGroupService, private router: Router, private userService: UserService, private notificationService: NotificationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.courseId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.feedbackRequestId = parseInt(<string>this.route.snapshot.paramMap.get('feedbackRequestsId'));
    var event = new PageEvent();
    event.pageIndex = 0;
    event.pageSize = 10;
    this.getFeedbacks(event);
    this.notificationService.getUsersByFeedbackRequest(event,this.feedbackRequestId).subscribe(
      response => {
        this.students = response.content;
        this.pageIndexSt = response.pageIndex;
        this.pageSizeSt = response.size;
        this.lengthSt = response.totalElements;
      })
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
    this.notificationService.sendNotificationToUser(this.feedbackRequestId, email).subscribe(data=>
      this.alertMessage('Successfully','Notification has been sent to => ' + email))
  }


  sendLetterToAllAvailableStudents() {
    let e = new PageEvent();
    e.pageSize = 2000;
    e.pageIndex = 0;
    this.notificationService.getUsersByFeedbackRequest(e,this.feedbackRequestId).subscribe(alluser=> {
        this.notificationService.sendNotificationToAvaliableUsers(this.feedbackRequestId, alluser.content).subscribe(data=>
          this.alertMessage('Successfully', 'Notification has been sent to all (' + alluser.content.length + ') available users'))

      }
    )
  }

  getStudents(event: PageEvent) {
    this.notificationService.getUsersByFeedbackRequest(event, this.feedbackRequestId).subscribe(
      response => {
        this.students = response.content;
        this.pageIndexSt = response.pageIndex;
        this.pageSizeSt = response.size;
        this.lengthSt = response.totalElements;
      }
    );
    return event;
  }
  alertMessage(h1:string, text: string) {
    const dialogRef = this.dialog.open(NotificationMessageComponent, {
      width: '50%',
      data: {h1: h1, text: text}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
