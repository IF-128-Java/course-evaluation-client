import {Component, OnInit, ViewChild} from '@angular/core';
import {MyGroupService} from '../../../services/student/my-group.service';
import {Student} from '../../../models/student/student.model';
import {Course} from '../../../models/student/course.model';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-av-courses',
  templateUrl: './av-courses.component.html',
  styleUrls: ['./av-courses.component.css']
})
export class AvCoursesComponent implements OnInit {

  listData: MatTableDataSource<any> = new MatTableDataSource<any>();

  courses: Course[] = [];

  public displayedColumns: string[] = ['Id', 'Course Name', 'Description', 'Start Date', 'End Date'];
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

  curStudent: Student = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    roles: [],
    groupId: '',
    groupName: '',
  };

  ngOnInit(): void {
    this.getStudent(Number(this.tokenStorage.getId()));
  }

  constructor(
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
}