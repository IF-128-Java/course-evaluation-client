import { Component, OnInit } from '@angular/core';
import {CourseDto} from "../../../models/course-dto.model";
import {PageEvent} from "@angular/material/paginator";
import {CoursesService} from "../../../services/courses.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AdminCreateCourseComponent} from "../admin-create-course/admin-create-course.component";

@Component({
  selector: 'app-admin-course-list',
  templateUrl: './admin-course-list.component.html',
  styleUrls: ['./admin-course-list.component.css']
})
export class AdminCourseListComponent implements OnInit {

  public courses: CourseDto[] = [];
  public displayedColumns: string[] = ['Course Name', 'Description', 'Start Date', 'End Date', 'Actions'];
  pageEvent?: PageEvent;
  pageIndex?: number;
  pageSize?: number;
  length?: number;
  activeItem: number | undefined;

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
    event.pageSize = 10;
    this.getCourses(event)
  }

  getCourses(event: PageEvent) {
    this.coursesService.getCourses(event).subscribe(
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

  showFeedbackRequests(id: any) {
    this.router.navigate(['/admin/courses/'+id+'/feedback_requests'])
  }

  addCourse() {
    const dialogRef = this.dialog.open(AdminCreateCourseComponent, { width: '50%' });
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit();
    });
  }
}
