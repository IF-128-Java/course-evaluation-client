import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserDto} from '../../../models/user-dto.model';
import {GroupDto} from '../../../models/group-dto.model';
import {MatListOption} from '@angular/material/list';
import {GroupService} from '../../../services/group.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  enrolledStudents?: UserDto[]
  candidates?: UserDto[];
  group: GroupDto = {};

  constructor(private groupService: GroupService, private userService: UserService,
              public dialogRef: MatDialogRef<StudentListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number) {
  }

  ngOnInit(): void {
    this.groupService.getById(this.data).subscribe(
      data => {
        this.group = data;
        this.enrolledStudents = data.students
      }
    );
    this.userService.getStudentCandidates().subscribe(data => {
      this.candidates = data;
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
