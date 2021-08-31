import { Component, OnInit } from '@angular/core';
import {Feedback} from "../../../models/feedback.model";
import {User} from "../../../models/user.model";
import {FeedbackService} from "../../../services/feedback.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MyGroupService} from "../../../services/student/my-group.service";
import {UserService} from "../../../admin_project/services/user.service";
import {NotificationService} from "../../../services/notification.service";
import {PageEvent} from "@angular/material/paginator";

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

  constructor(private feedbackService: FeedbackService, private route: ActivatedRoute, private groupService: MyGroupService, private router: Router, private userService: UserService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.courseId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.feedbackRequestId = parseInt(<string>this.route.snapshot.paramMap.get('feedbackRequestsId'));
    var event = new PageEvent();
    event.pageIndex = 0;
    event.pageSize = 10;
    this.notificationService.getUsersByFeedbackRequest(this.feedbackRequestId).subscribe(userList =>
      this.students = userList)
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
