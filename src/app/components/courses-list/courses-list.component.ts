import { Component, OnInit } from '@angular/core';
import {Course} from '../../models/course.model';
import {CoursesService} from '../../services/courses.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courses?: Course[];
  currentCourse: Course = {};
  currentIndex = 1;
  courseName = '';
  activeItem: number | undefined;

  constructor(private coursesService: CoursesService, private router: Router) { }

  onSelect(item: number): void {
    this.activeItem = item;
  }

  ngOnInit(): void {
  this.retrieveCourses()
  }

  retrieveCourses(): void {
    this.coursesService.getAll().subscribe(
      data => {this.courses = data;
      console.log(data);
      },
      (error: any) => {console.log(error);
      })
  }

  refreshList():void {
    this.retrieveCourses();
    this.currentCourse = {};
    this.currentIndex = 1;
  }

  searchCourseName(): void {
    this.currentCourse = {};
    this.currentIndex = 1;

    this.coursesService.findByCourseName(this.courseName).subscribe(
      data => {
        this.courses = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  showFeedbackRequests(id: any) {
    this.router.navigate(['/courses/'+id+'/feedback_requests'])
  }
}
