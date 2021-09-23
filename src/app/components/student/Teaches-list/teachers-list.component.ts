import {Component, OnInit, ViewChild} from "@angular/core";
import {MyGroupService} from '../../../services/student/my-group.service';
import {TeacherStat} from '../../../models/student/teacher-stat.model';
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {coursescountModel} from "../../../models/student/coursescount.model.";
import {SelectionModel} from "@angular/cdk/collections";
import {Student} from "../../../models/student/student.model";
import {Mail} from "../../../models/student/mail.model";

@Component({
  selector: 'app-teachers-list',
  templateUrl: 'teachers-list.component.html',
  styleUrls: ['teachers-list.component.css']
})
export class TeachersListComponent implements OnInit{

  public displayedColumns: string[] = ['FirstName', 'LastName', 'Courses', 'Email', "Check"];
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

  listData: MatTableDataSource<any> = new MatTableDataSource<any>();
  allTeachers: TeacherStat[] = [];
  allCoursesCounts: coursescountModel[] = [];
  selection = new SelectionModel<TeacherStat>(true, []);

  mess: string = '';

  mail: Mail = {
    to: '',
    subject: '',
    message: ''
  };

  ngOnInit(): void {
    this.getTeachers();
  }

  constructor(
    private snackBar: MatSnackBar,
    private tokenStorage: TokenStorageService,
    private MyGroupService: MyGroupService,
  ) { }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.allTeachers.length;
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

  getTeachers(): void {
    this.MyGroupService.getTeachers().subscribe(data => {
        this.allTeachers = data;
        this.getStats();
      },
      error => {

        console.log(error);
      }
    );
  }

  getStats(): void {
    this.MyGroupService.getTeacherStat().subscribe(data => {
        this.allCoursesCounts = data;

        if (!this.allCoursesCounts != undefined) {
          this.allTeachers.forEach(teacher => {
            let stat = this.allCoursesCounts.find(a => a.id == teacher.id);

            if (stat != undefined) {
              teacher.totalCourses = stat.totalCourses;
              teacher.email = stat.email;
            } else {
              teacher.totalCourses = "-";
            }
          })
        }

        this.listData = new MatTableDataSource(this.allTeachers);
        setTimeout(() => this.listData.paginator = this.paginator);
      },
      error => {
        console.log(error);
      }
    );

  }

  sendMail(): void {
    if (this.selection.selected.length == 0 ) {
      this.snackBar.open("No one Teacher selected. Make selection first. ", '',  {
        duration:  3000 });
    }
    else if (this.mess == ""){
      this.snackBar.open("No message entered. Please write message. ", '',  {
        duration:  3000});
    } else {

      this.mail.subject = "You have message" ;
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
