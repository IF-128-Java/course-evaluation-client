import {Component, OnInit, ViewChild} from '@angular/core';
import {MyGroupService} from '../../../services/student/my-group.service';
import {Student} from '../../../models/student/student.model';
import {Course} from '../../../models/student/course.model';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-my-courses',
  templateUrl: './passed-courses.component.html',
  styleUrls: ['./passed-courses.component.css']
})
export class PassedCoursesComponent implements OnInit{

  public displayedColumns: string[] = ['Id', 'Course Name', 'Description', 'Start Date', 'End Date'];
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

  listData: MatTableDataSource<any> = new MatTableDataSource<any>();

  courses: Course[] = [];

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

  getFinishedCoursesOfGroup(id: number): void {
    this.MyGroupService.getFinishedCoursesOfGroup(id).subscribe(data => {
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
        this.getFinishedCoursesOfGroup(+this.curStudent.groupId);
      },
      error => {
        console.log(error);
      }
    );
  }
}
