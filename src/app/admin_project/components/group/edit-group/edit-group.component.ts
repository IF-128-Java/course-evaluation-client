import {Component, Inject, OnInit} from '@angular/core';
import {GroupService} from '../../../services/group.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GroupDto} from '../../../models/group-dto.model';

export interface DialogData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  group?: GroupDto;
  errorMessage?: string;
  form: any = {};

  constructor(private groupService: GroupService, public dialogRef: MatDialogRef<EditGroupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.form.groupName = this.data.name
  }

  onSubmit() {
    this.groupService.updateName(this.data.id, this.form.groupName).subscribe(data => {
      this.dialogRef.close();
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  onSearchChange($event: Event) {
    this.errorMessage = '';
  }
}
