import {AfterViewInit, Component} from '@angular/core';
import {CourseDto} from '../../../models/course-dto.model';
import {GroupService} from '../../../services/group.service';
import {ActivatedRoute} from '@angular/router';
import {GroupDto} from '../../../models/group-dto.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-group-course-list',
  templateUrl: './group-course-list.component.html',
  styleUrls: ['./group-course-list.component.css']
})
export class GroupCourseListComponent implements AfterViewInit {
  courses: CourseDto[] = [];
  group?: GroupDto;
  displayedColumns: string[] = ['Course Name', 'Description', 'Start Date', 'End Date', 'Teacher First Name', 'Teacher Last Name', 'Status', 'Actions'];
  search: string = '';
  myControl = new FormControl('');
  id?: number;

  pageEvent = new PageEvent();
  pageIndex?: number;
  pageSize?: number;
  length?: number;
  filtering: FormGroup;
  sorting: 'start_date' | 'end_date' = 'start_date'
  direction: string = 'ASC';
  order: string = 'start_date';
  status: string []= ['active'];

  constructor(private groupService: GroupService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.filtering = fb.group({
      active: true,
      expected: false,
      completed: false
    });
  }


  ngAfterViewInit(): void {
    if (this.status.length===0){
      this.filtering = this.fb.group({
        active: true,
        expected: false,
        completed: false
      });
      this.status = ['active'];
    }
    this.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.groupService.getById(this.id).subscribe(data => {
      this.group = data;
    })
    this.getCourses(this.getPageEvent(this.pageEvent));
    this.filtering.controls['completed'].valueChanges.subscribe(value => {
      this.setStatus('completed', value)
    });
    this.filtering.controls['active'].valueChanges.subscribe(value => {
      this.setStatus('active', value)
    });
    this.filtering.controls['expected'].valueChanges.subscribe(value => {
      this.setStatus('expected', value)
    });
  }

  removeCourse(course: CourseDto) {
    this.groupService.removeCourse(this.group?.id, course).subscribe(d => {
      if (this.pageEvent.pageIndex != 0 && this.courses.length == 1) {
        this.pageEvent.pageIndex = this.pageEvent.pageIndex - 1;
      }
      this.ngAfterViewInit()
    })
  }

  getStatus(course: CourseDto): string {
    if (Date.parse(<string>course.endDate?.toString()) <= new Date().getTime()) {
      return 'Completed'
    }
    if (Date.parse(<string>course.startDate?.toString()) >= new Date().getTime()) {
      return 'Expected'
    }
    return 'Active';
  }

  getCourses(event: PageEvent) {
    this.groupService.getCoursesByGroupId(<number>this.id, this.search, event, this.order, this.direction, this.status).subscribe(
      response => {
        this.courses = response.content;
        this.pageIndex = response.number;
        this.pageSize = response.size;
        this.length = response.totalElements;
      }
    );
    return event;
  }

  changeOrder() {
    if (this.direction === 'ASC') {
      this.direction = 'DESC'
    } else {
      this.direction = 'ASC'
    }
    this.ngAfterViewInit()
  }

  onChange(event: any) {
    this.order = event
    this.ngAfterViewInit()
  }

  getPageEvent(event: PageEvent) {
    if (this.pageIndex || this.pageSize) {
      return event;
    }
    event.pageIndex = 0;
    event.pageSize = 10;
    return event;
  }

  filterCourses(value: any) {
    this.search = value;
    this.pageEvent.pageIndex = 0;
    this.ngAfterViewInit()
  }

  setStatus(status: string, value: boolean) {
    const index = this.status.indexOf(status, 0)
    if (!value) {
      if (index > -1) {
        this.status = this.status.filter(item => item != status)
      }
    } else {
      if (index === -1) {
        this.status.push(status)
      }
    }
    this.pageEvent.pageIndex = 0;
  }

  statusChange(event: MatCheckboxChange, status: string) {
    this.setStatus(status, event.checked)
    this.ngAfterViewInit()
  }
}
