import {Component, OnInit} from '@angular/core';
import {CourseDto} from '../../../models/course-dto.model';
import {GroupDto} from '../../../models/group-dto.model';
import {GroupService} from '../../../services/group.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-group-add-course',
  templateUrl: './group-add-course.component.html',
  styleUrls: ['./group-add-course.component.css']
})
export class GroupAddCourseComponent implements OnInit {
  courses: CourseDto[] = [];
  group_id?: number;
  group?: GroupDto;
  displayedColumns: string[] = ['Course Name', 'Description', 'Start Date', 'End Date', 'Teacher First Name', 'Teacher Last Name', 'Actions'];
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions?: Observable<string[]>;

  pageEvent?: PageEvent;
  pageIndex?: number;
  pageSize?: number;
  length?: number;

  constructor(private groupService: GroupService, private route: ActivatedRoute,private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    var event = new PageEvent();
    event.pageIndex = 0;
    event.pageSize = 25;
    this.group_id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.groupService.getById(this.group_id).subscribe(data => {
      this.group = data;
    })
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          this.groupService.getAvailableByGroupId(this.group_id, value, event).subscribe(
            data => {
              this.courses = data.content
              this.length = data.totalElements

            }
          )
          return this._filter(value)
        })
      );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addCourse(course: CourseDto) {
    this.groupService.addCourse(this.group_id, course).subscribe(data => {
      this.ngOnInit()
    })
  }

  getCourses(event: PageEvent) {
    this.groupService.getAvailableByGroupId(this.group_id, this.myControl.value, event).subscribe(
      response => {
        this.courses = response.content;
        this.pageIndex = response.pageIndex;
        this.pageSize = response.size;
        this.length = response.totalElements;
      }
    );
    return event;
  }

  isCourseStarted(course: any): boolean {
    return Date.parse(course.startDate.toString()) <= new Date().getTime();
  }

  beginningDuration(course: any): number {
    return Math.floor((new Date().getTime() - Date.parse(course.startDate.toString())) / (1000 * 3600 * 24));
  }

  openInfo(course : any) {
    var message = 'Course has already started '+this.beginningDuration(course)+' days ago!'
    const config = new MatSnackBarConfig();
    config.panelClass=['snackBar-panel']
    config.duration=4000;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    this._snackBar.open(message, 'X',config);
  }
}
