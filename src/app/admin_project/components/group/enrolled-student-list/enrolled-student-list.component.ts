import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserDto} from '../../../models/user-dto.model';
import {GroupDto} from '../../../models/group-dto.model';
import {MatListOption} from '@angular/material/list';
import {GroupService} from '../../../services/group.service';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './enrolled-student-list.component.html',
  styleUrls: ['./enrolled-student-list.component.css']
})
export class EnrolledStudentListComponent implements OnInit {
  enrolledStudents?: UserDto[]
  candidates?: (UserDto | undefined)[];
  group: GroupDto = {};

  constructor(private groupService: GroupService, private studentService: StudentService,
              public dialogRef: MatDialogRef<EnrolledStudentListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number) {
  }

  ngOnInit(): void {
    this.groupService.getById(this.data).subscribe(
      data => {
        this.group = data;
        this.enrolledStudents = data.students
      }
    );
    this.studentService.getStudentCandidates().subscribe(data => {
      this.candidates = data.map(d => d.userDto);
    })
  }


  removeStudents(selected: MatListOption[]) {
    this.groupService.removeStudent(this.data, selected.map(item => item.value))
      .subscribe(d => this.ngOnInit());

  }

  addStudents(selected: MatListOption[]) {
    this.groupService.addStudent(this.data, selected.map(item => item.value))
      .subscribe(d => this.ngOnInit());
  }
}
