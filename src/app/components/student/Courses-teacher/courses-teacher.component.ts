import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {Course} from "../../../models/student/course.model";
import {MyGroupService} from '../../../services/student/my-group.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-teacher-courses',
  templateUrl: './courses-teacher.component.html',
  styleUrls: ['./courses-teacher.component.css']
})

export class CoursesTeacherComponent implements OnInit{

  public displayedColumns: string[] = ['CourseName', 'Description', 'StartDate', 'EndDate'];
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

  listData: MatTableDataSource<any> = new MatTableDataSource<any>();

  teacherId: number;
  firstName: string;
  lastName: string
  teacherCourses: Course[] = [];

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private MyGroupService: MyGroupService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.teacherId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.getCoursesByTeacherId(this.teacherId);
  }

  getCoursesByTeacherId(id: number): void {
    this.MyGroupService.getCoursesByTeacherId(this.teacherId).subscribe(data => {
        this.teacherCourses = data;
        console.log(data);
        this.listData = new MatTableDataSource(this.teacherCourses);
        setTimeout(() => this.listData.paginator = this.paginator);
      },
      error => {
        console.log(error);
      }
    );
  }

}
