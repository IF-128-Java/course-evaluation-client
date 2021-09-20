import {Component, OnInit, ViewChild} from '@angular/core';
import {MyGroupService} from '../../../services/student/my-group.service';
import {Student} from '../../../models/student/student.model';
import {Mail} from '../../../models/student/mail.model';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FeedbackCount} from '../../../models/student/feedbackcount.model';
import {Question} from "../../../models/question.model";

@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.component.html',
  styleUrls: ['./my-group.component.css']
})
export class MyGroupComponent implements OnInit{

  public displayedColumns: string[] = ['FirstName', 'LastName', "Email", "Feedback", "Check"];
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

  listData: MatTableDataSource<any> = new MatTableDataSource<any>();
  selection = new SelectionModel<Student>(true, []);
  mess: string = '';

  allstudents: Student[] = [];
  allFeedbackCounts: FeedbackCount[] = [];

  curStudent: Student = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    roles: [],
    groupId: '',
    groupName: '',
    groupChatRoomId: '',
    position: 0,
    feedbackcouner: "-"
  };

  mail: Mail = {
    to: '',
    subject: '',
    message: ''
  };

  ngOnInit(): void {
    this.getStudent(Number(this.tokenStorage.getId()));
  }

  constructor(
    private snackBar: MatSnackBar,
    private tokenStorage: TokenStorageService,
    private MyGroupService: MyGroupService,
  ) { }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.allstudents.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.listData.data);
  }

  checkboxLabel(row?: Student): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getAllStudentsInGroup(id: number): void {
    this.MyGroupService.getStudentsByGroupId(id).subscribe(data => {
        this.allstudents = data;
        this.getFeedbacks();

      },
      error => {
        console.log(error);
      }
    );
  }

  getStudent(id: number): void {
    this.MyGroupService.get(id).subscribe(data => {
        this.curStudent = data;
        this.getAllStudentsInGroup(+this.curStudent.groupId);
      },
      error => {

        console.log(error);
      }
    );
  }

    getFeedbacks(): void {
    this.MyGroupService.getFeedback().subscribe(data => {
        this.allFeedbackCounts = data;

        if (!this.allFeedbackCounts != undefined) {
          this.allstudents.forEach(student => {
            let feedback = this.allFeedbackCounts.find(a => a.studentId == student.id );

            if (feedback != undefined) {
              student.feedbackcouner = feedback.total;
            } else {
              student.feedbackcouner = "-";
            }
          })
        }

        this.listData = new MatTableDataSource(this.allstudents);
        setTimeout(() => this.listData.paginator = this.paginator);
      },
      error => {
        console.log(error);
      }
    );
  }





  sendMail(): void {
    if (this.selection.selected.length == 0 ) {
      this.snackBar.open("No one student selected. Make selection first. ", '',  {
        duration:  3000 });
    }
    else if (this.mess == ""){
      this.snackBar.open("No message entered. Please write message. ", '',  {
        duration:  3000});
    } else {

      this.mail.subject = "You have message from " + this.curStudent.firstName + " " + this.curStudent.lastName;
      this.mail.message = this.mess;

      this.mail.to = "";
      for (var j in this.selection.selected) {
        this.mail.to = this.mail.to + this.selection.selected[j].email + ",";
      }

      this.MyGroupService.sendMail(this.mail).subscribe(data => {
        this.selection.clear();

        this.snackBar.open("Mail sent successfully ", '',  {
         duration:  3000 });

        },
        error => {
          console.log(error.message);
        }
    );

    }
    return;
  }
}
