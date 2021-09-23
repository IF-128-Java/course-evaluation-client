import {Component, OnInit, ViewChild} from '@angular/core';
import {MyGroupService} from '../../../services/student/my-group.service';
import {Student} from '../../../models/student/student.model';
import {Course} from '../../../models/student/course.model';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from "@angular/router";

@Component({
  selector: 'app-av-courses',
  templateUrl: './av-courses.component.html',
  styleUrls: ['./av-courses.component.css']
})
export class AvCoursesComponent implements OnInit {

  listData: MatTableDataSource<any> = new MatTableDataSource<any>();

  courses: Course[] = [];

  public displayedColumns: string[] = ['CourseName', 'Description', 'Teacher', 'StartDate', 'EndDate'];
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

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

  ngOnInit(): void {
    this.getStudent(Number(this.tokenStorage.getId()));
  }

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private MyGroupService: MyGroupService,

  ) { }

  getAvailableCourses(): void {
    this.MyGroupService.getAvailableCourses().subscribe(data => {
        this.courses = data;
        this.listData = new MatTableDataSource(this.courses);
        setTimeout(() => this.listData.paginator = this.paginator);
      },
      error => {
        console.log(error);
      }
    );
  }

  getStudent(id: number): void {
    this.MyGroupService.get(id).subscribe(data => {
        this.curStudent = data;
        this.getAvailableCourses();
      },
      error => {
        console.log(error);
      }
    );
  }

  onTeacherInfo(id: number): void {
    this.router.navigateByUrl('/teacher-courses/'+id)
  }

}
