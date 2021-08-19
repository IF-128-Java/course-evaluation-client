import {Component, OnInit} from '@angular/core';
import {GroupDto} from '../../../models/group-dto.model';
import {GroupService} from '../../../services/group.service';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  form: any = {};
  group?: GroupDto;
  errorMessage?: string;
  constructor(private groupService: GroupService,public dialogRef: MatDialogRef<CreateGroupComponent>) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.group = new GroupDto();
    this.group.groupName = this.form.groupName;
    this.groupService.create(this.group.groupName).subscribe(data => {
    this.dialogRef.close();
      },error => {
      this.errorMessage=error.error.message;
    });
  }


  onSearchChange($event: Event) {
    this.errorMessage='';
  }
}
