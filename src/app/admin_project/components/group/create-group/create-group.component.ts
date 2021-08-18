import {Component, OnInit} from '@angular/core';
import {GroupDto} from '../../../models/group-dto.model';
import {GroupService} from '../../../services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  form: any = {};
  group?: GroupDto;
  message: string = '';
  errorMessage?: string;
  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.group = new GroupDto();
    this.group.groupName = this.form.groupName;
    this.groupService.create(this.group.groupName).subscribe(data => {
      this.message='A group with name : '+this.form.groupName+' was successfully created!';
    },error => {
      this.errorMessage=error.error.message;
      this.message='';
    });
  }


  onSearchChange($event: Event) {
    this.errorMessage='';
    this.message='';
  }
}
