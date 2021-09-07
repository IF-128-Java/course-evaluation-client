import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CourseDto} from '../../../models/course-dto.model';
import {UserDto} from '../../../models/user-dto.model';
import {CoursesService} from '../../../services/courses.service';
import {UserService} from '../../../services/user.service';
import {Teacher} from '../../../../models/teacher.model';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

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
  teachers?: Teacher[];
  teacherObj: UserDto = {};
  control = new FormControl('', Validators.required);
  submitted = false

  constructor(private courseService: CoursesService,
              private userService: UserService, private _ngZone: NgZone) { }

  ngOnInit(): void {
    this.getTeachersList()
  }

  getTeachersList(){
    this.userService.getTeachers().subscribe(
      data => {this.teachers = data;
      },
      (error: any) => {
        console.log(error);
      })
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take<any>(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  public async selected(event: MouseEvent, id: any): Promise<void> {
    this.teacherObj.id = +id;
  }

  onSubmit(created: NgForm) {
    const data = {
      courseName: this.form.courseName,
      description: this.form.description,
      startDate: this.form.startDate,
      endDate: this.form.endDate,
      teacherDto: this.teacherObj
    };
    console.log(data);
    this.courseService.createCourse(data).subscribe(response => {
      this.submitted = true;
      this.message='A course: '+this.form.courseName+' was successfully created!';
      created.reset();
    },error => {
      this.errorMessage = error.error.message;
    });
  }

  onSearchChange($event: Event) {
    this.errorMessage = '';
  }
}
