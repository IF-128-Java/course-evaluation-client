import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {StudentDto} from '../../../models/student-dto.model';
import {StudentService} from '../../../services/student.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: StudentDto[] = [];
  public displayedColumns: string[] = ['Id', 'First Name', 'Last Name', 'Group Id', 'Group Name'];
  pageEvent?: PageEvent;
  pageIndex?: number;
  pageSize?: number;
  length?: number;

  constructor(private studentService: StudentService,
              public dialogRef: MatDialogRef<StudentListComponent>
  ) {
  }

  ngOnInit(): void {
    var event = new PageEvent();
    event.pageIndex = 0;
    event.pageSize = 25;
    this.getStudents(event);
  }

  getStudents(event: PageEvent) {
    this.studentService.getAllStudents(event).subscribe(
      response =>{
        this.students = response.content;
        this.pageIndex = response.pageIndex;
        this.pageSize = response.size;
        this.length = response.totalElements;
      }
    );
    return event;
  }
}
