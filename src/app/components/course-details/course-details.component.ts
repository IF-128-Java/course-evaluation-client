import { Component, OnInit } from '@angular/core';
import {Course} from "../../models/course.model";
import {CoursesService} from "../../services/courses.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  currentCourse: Course = {
    courseName: '',
    description: '',
    startDate: '',
    endDate: '',
    teacher: ''
  };
  message = ';'

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getCourse(this.route.snapshot.params.id);
  }

  getCourse(id: number): void {
    this.coursesService.get(id).subscribe(data => {
      this.currentCourse = data;
      console.log(data);
      },
      error => {
      console.log(error);
      }
    );
  }

  UpdateCourse(): void {
    this.message = '';

    this.coursesService.update(this.currentCourse.id, this.currentCourse).subscribe(
      response => { console.log(response);
      this.message = response.message ? response.message : 'Course was updated!'; },
      error => {
        console.log(error);
      }
    );
  }

  deleteCourse(): void {
    this.coursesService.delete(this.currentCourse.id).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/courses']);
      },
      error => {
        console.log(error);
      }
    )
  }
}
