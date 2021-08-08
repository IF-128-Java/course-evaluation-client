import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {StudentDto} from '../../../models/student-dto.model';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: StudentDto[]=[];
  public displayedColumns: string[] = ['Id', 'First Name', 'Last Name', 'Group Id', 'Group Name'];

  constructor(private studentService: StudentService,
              public dialogRef: MatDialogRef<StudentListComponent>
  ) {
  }

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(data => {
      this.students = data;
    })
  }

}
