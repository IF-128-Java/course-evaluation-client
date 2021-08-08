import {Component, OnInit} from '@angular/core';
import {CourseDto} from '../../../models/course-dto.model';
import {GroupService} from '../../../services/group.service';
import {ActivatedRoute} from '@angular/router';
import {GroupDto} from '../../../models/group-dto.model';

@Component({
  selector: 'app-group-course-list',
  templateUrl: './group-course-list.component.html',
  styleUrls: ['./group-course-list.component.css']
})
export class GroupCourseListComponent implements OnInit {
  courses: CourseDto[] = [];
  group?: GroupDto;
  displayedColumns: string[] = ['Id', 'Course Name', 'Description', 'Start Date', 'End Date', 'Teacher First Name', 'Teacher Last Name'];

  constructor(private groupService: GroupService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    var id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.groupService.getCoursesByGroupId(id)
      .subscribe(data => {
        this.courses = data;
      })
    this.groupService.getById(id).subscribe(data => {
      this.group = data;
    })
  }

}
