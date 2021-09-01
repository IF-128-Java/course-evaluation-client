import { Component, OnInit } from '@angular/core';
import {CourseDto} from '../../../models/course-dto.model';
import {PageEvent} from '@angular/material/paginator';
import {CoursesService} from '../../../services/courses.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AdminCreateCourseComponent} from '../admin-create-course/admin-create-course.component';
import {AdminEditCourseComponent} from '../admin-edit-course/admin-edit-course.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-admin-course-list',
  templateUrl: './admin-course-list.component.html',
  styleUrls: ['./admin-course-list.component.css']
})
export class AdminCourseListComponent implements OnInit {

  public courses: CourseDto[] = [];
  public foundCourses: CourseDto[] = [];
  public displayedColumns: string[] = ['Course Name', 'Description', 'Start Date', 'End Date', 'Actions'];
  pageEvent?: PageEvent = new PageEvent();
  pageIndex?: number;
  pageSize?: number;
  length?: number;
  activeItem: number | undefined;
  searchCourse = new FormControl('');
  courseName: string = '';
  orderBy: string = 'courseName';
  direction: string = 'ASC';

  constructor(private coursesService: CoursesService,
              public dialog: MatDialog,
              public dialogModRef: MatDialogRef<any>,
              private router: Router) { }

  onSelect(item: number): void {
    this.activeItem = item;
  }

  ngOnInit(): void {
    var event = new PageEvent();
    event.pageIndex = 0;
    event.pageSize = 25;
    this.getCourses(event)
  }

  getCourses(event: PageEvent) {
    this.coursesService.getCourses(event, this.orderBy, this.direction).subscribe(
      response => {
        this.courses = response.content;
        this.pageIndex = response.pageIndex;
        this.pageSize = response.pageSize;
        this.length = response.totalElements;
      }
    );
    return event;
  }
  showFeedbackRequests(id: any) {
    this.router.navigate(['/admin/courses/'+id+'/feedback_requests'])
  }

  addCourse() {
    const dialogRef = this.dialog.open(AdminCreateCourseComponent, { width: '50%' });
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit();
    });
  }

  editCourse(id: any) {
    this.router.navigate(['/admin/courses/'+id]);

  }

  searchCourses(value: any) {
      this.courseName = value;
      this.ngOnInit()
  }

  searchCourseName(name: string): void {
    this.coursesService.findByCourseName(name).subscribe(
      data => {
        this.courses = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  changeDirection(sortingColumn: string){
    this.orderBy = sortingColumn;
    this.direction = this.direction == 'ASC' ? 'DESC' : 'ASC';
    this.ngOnInit();
  }


  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  deleteCourse(id: any): void {
    this.coursesService.delete(id).subscribe(
      response => {
        this.reloadCurrentRoute();
      },
      error => {
        console.log(error);
      }
    )
  }
}
