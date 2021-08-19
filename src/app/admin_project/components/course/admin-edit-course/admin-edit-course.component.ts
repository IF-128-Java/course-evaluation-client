import { Component, OnInit } from '@angular/core';
import {Course} from '../../../../models/course.model';
import {CoursesService} from '../../../services/courses.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Teacher} from "../../../../models/teacher.model";
import {UserService} from "../../../services/user.service";
import {UserDto} from "../../../models/user-dto.model";
import {NgForm} from "@angular/forms";
import {CourseDto} from "../../../models/course-dto.model";

@Component({
  selector: 'app-admin-edit-course',
  templateUrl: './admin-edit-course.component.html',
  styleUrls: ['./admin-edit-course.component.css']
})
export class AdminEditCourseComponent implements OnInit {

  currentCourse: CourseDto;
  message = '';
  teachers?: Teacher[];
  teacherObj: UserDto = {};


  constructor(
    private coursesService: CoursesService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getCourse(this.route.snapshot.params.id);
    this.getTeachersList();
  }

  getTeachersList(){
    this.userService.getTeachers().subscribe(
      data => {this.teachers = data;
      },
      (error: any) => {
        console.log(error);
      })
  }

  public async selected(event: MouseEvent, id: any): Promise<void> {
    this.teacherObj.id = +id;
    console.log(this.teacherObj.id)
  }

  getCourse(id: number): void {
    this.coursesService.getCourse(id).subscribe(data => {
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
    this.currentCourse.teacherDto = this.teacherObj;
    this.coursesService.editCourse(this.currentCourse.id, this.currentCourse).subscribe(
      response => { console.log(response);
        this.message = response.message ? response.message : 'Course was updated!'; },
      error => {
        console.log(error);
      }
    );
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }
  deleteCourse(id: any): void {
    this.coursesService.delete(this.currentCourse.id).subscribe(
      response => {
        console.log(response);
        this.reloadCurrentRoute();
      },
      error => {
        console.log(error);
      }
    )
  }

}
