import { Component, OnInit } from '@angular/core';
import {Course} from "../../../../models/course.model";
import {CourseDto} from "../../../models/course-dto.model";
import {UserDto} from "../../../models/user-dto.model";
import {CoursesService} from "../../../services/courses.service";
import {GroupDto} from "../../../models/group-dto.model";
import {UserService} from "../../../services/user.service";
import {Teacher} from "../../../../models/teacher.model";

@Component({
  selector: 'app-admin-create-course',
  templateUrl: './admin-create-course.component.html',
  styleUrls: ['./admin-create-course.component.css']
})
export class AdminCreateCourseComponent implements OnInit {

  form: any = {};
  course: CourseDto;
  message: string = '';
  errorMessage?: string;
  private teacherId: number | undefined;
  teachers?: Teacher[];

  constructor(private courseService: CoursesService, private userService: UserService) { }

  ngOnInit(): void {
    this.getTeachersList()
  }

  getTeachersList(){
    this.userService.getTeachers().subscribe(
      data => {this.teachers = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      })
  }

  onSubmit() {
    this.course = new CourseDto();
    this.course.courseName = this.form.courseName;
    this.course.description = this.form.description;
    this.course.startDate = this.form.startDate;
    this.course.endDate = this.form.endDate;
    this.course.teacherDto = this.form.teacherId;
    console.log(this.course);
    this.courseService.createCourse(this.course).subscribe(data => {
      this.message='A course: '+this.form.courseName+' was successfully created!';
    },error => {
      this.errorMessage = error.error.message;
    });
  }

  onSearchChange($event: Event) {
    this.errorMessage = '';
  }
}
