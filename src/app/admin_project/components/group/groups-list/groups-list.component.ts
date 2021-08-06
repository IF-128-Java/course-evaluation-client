import {Component, OnInit} from '@angular/core';
import {GroupDto} from '../../../models/group-dto.model';
import {GroupService} from "../../../services/group.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UpdateRoleComponent} from "../../user/update-role/update-role.component";
import {StudentListComponent} from "../student-list/student-list.component";


@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  public groups: GroupDto[]=[];
  public displayedColumns: string[] = ['Id', 'Group Name','Students','Courses'];
  constructor(private groupService:GroupService, public dialog: MatDialog, public dialModRef:MatDialogRef<any>) {
  }
  ngOnInit(): void {
    this.groupService.getGroups().subscribe(data=>{
      this.groups=data;
    })
  }


  openStudents(id: number) {
    this.groupService.getById(id).subscribe(data => {
        const dialogRef = this.dialog.open(StudentListComponent, {
          width: '400px',
          data: data
        });
        dialogRef.afterClosed().subscribe(result => {
          window.location.reload();
        });
      }
    );
  }
}
