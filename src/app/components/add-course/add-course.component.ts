import { Component, OnInit } from '@angular/core';
import {Course} from "../../models/course.model";
import {CoursesService} from "../../services/courses.service";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  course: Course = {
    courseName: '',
    description: '',
    startDate: '',
    endDate: '',
    teacher: ''
  }
  submitted = false

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
  }

  saveCourse(): void {
    const data = {
      courseName: this.course.courseName,
      description: this.course.description,
      startDate: this.course.startDate,
      endDate: this.course.endDate,
      teacher: this.course.teacher
    };

    this.coursesService.create(data).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
    (error: any) => {
      console.log(error)
      });
  }

  newCourse(): void {
    this.submitted = false;
    this.course = {
      courseName: '',
      description: '',
      startDate: '',
      endDate: '',
      teacher: ''
    }
  }

}
