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
    teacher_id: ''
  }
  submitted = false
  private numId: number | undefined;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
  }

  saveCourse(): void {
    this.numId = +this.course.teacher_id;
    const data = {
      courseName: this.course.courseName,
      description: this.course.description,
      startDate: this.course.startDate,
      endDate: this.course.endDate,
      teacher_id: this.numId
    };
    console.log(data);

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
      teacher_id: ''
    }
  }

}
