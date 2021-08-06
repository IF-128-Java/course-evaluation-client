import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserDto} from '../../../models/user-dto.model';
import {UserService} from '../../../services/user.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {
  public user: UserDto = {};
  roles: FormGroup;
  message: string | undefined;

  constructor(public dialogRef: MatDialogRef<UpdateRoleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserDto,
              private userService: UserService) {
    this.roles = new FormGroup({});
  }

  ngOnInit(): void {
    this.roles = new FormGroup({
      'student': new FormControl(this.data.roles?.includes('ROLE_STUDENT')),
      'teacher': new FormControl(this.data.roles?.includes('ROLE_TEACHER')),
      'admin': new FormControl(this.data.roles?.includes('ROLE_ADMIN')),
    });
  }

  public onSubmit() {
    let arrRole: string[] = [];
    if (this.roles.value.student) {
      arrRole.push('ROLE_STUDENT')
    }
    if (this.roles.value.teacher) {
      arrRole.push('ROLE_TEACHER')
    }
    if (this.roles.value.admin) {
      arrRole.push('ROLE_ADMIN')
    }
    this.data.roles = arrRole;
    this.userService.addRoles(this.data).subscribe(d => {
      var arr = d.roles;
      for (var index = 0; index < arr.length; ++index) {
        arr[index] = arr[index].substring(5);
      }
      this.message = arr;
    })
  }

  public cancel() {
    this.message = '';
    this.ngOnInit()
  }
}
