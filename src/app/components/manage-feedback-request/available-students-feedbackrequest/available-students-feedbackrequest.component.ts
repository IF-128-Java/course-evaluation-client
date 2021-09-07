import { Component, OnInit } from '@angular/core';
import {Feedback} from '../../../models/feedback.model';
import {User} from '../../../models/user.model';
import {FeedbackService} from '../../../services/feedback.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MyGroupService} from '../../../services/student/my-group.service';
import {UserService} from '../../../admin_project/services/user.service';
import {NotificationService} from '../../../services/notification.service';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {NotificationMessageComponent} from '../notification-message/notification-message.component';

@Component({
  selector: 'app-available-students-feedbackrequest',
  templateUrl: './available-students-feedbackrequest.component.html',
  styleUrls: ['./available-students-feedbackrequest.component.css']
})
export class AvailableStudentsFeedbackrequestComponent implements OnInit {
  displayedColumnsStudents: string[] = ['Student', 'Email', 'Action'];
  public feedbacks: Feedback[] = [];
  public students: User[] = [];
  feedbackRequestId: number;
  lengthSt: any;
  pageIndexSt: any;
  pageSizeSt: any;
  courseId?: any;
  pageEvent?: PageEvent;

  constructor(private feedbackService: FeedbackService, private route: ActivatedRoute, private groupService: MyGroupService, private router: Router, private userService: UserService, private notificationService: NotificationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.courseId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.feedbackRequestId = parseInt(<string>this.route.snapshot.paramMap.get('feedbackRequestsId'));
    var event = new PageEvent();
    event.pageIndex = 0;
    event.pageSize = 10;
    this.notificationService.getUsersByFeedbackRequest(event, this.feedbackRequestId).subscribe(response=> {
        this.students = response.content;
        this.pageIndexSt = response.pageIndex;
        this.pageSizeSt = response.size;
        this.lengthSt = response.totalElements;
      }
      )
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
