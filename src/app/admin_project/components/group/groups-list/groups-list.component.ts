import {Component, OnInit} from '@angular/core';
import {GroupDto} from '../../../models/group-dto.model';
import {GroupService} from '../../../services/group.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CreateGroupComponent} from '../create-group/create-group.component';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {GroupNotEmptyDialogComponent} from "../group-not-empty-dialog/group-not-empty-dialog.component";


@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  public groups: GroupDto[] = [];
  public displayedColumns: string[] = ['Id', 'Group Name', 'Students', 'Courses', 'Actions'];
  pageEvent?: PageEvent;
  pageIndex?: number;
  pageSize?: number;
  length?: number;

  constructor(private groupService: GroupService,
              public dialog: MatDialog, public dialModRef: MatDialogRef<any>,
              private router: Router) {
  }

  ngOnInit(): void {
    var event = new PageEvent();
    event.pageIndex = 0;
    event.pageSize = 25;
    this.getGroups(event);
  }


  openStudents(id: number) {
   this.router.navigateByUrl('admin/groups/' + id + '/enrolled-students')
  }

  addGroup() {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  alertMessage() {
    const dialogRef = this.dialog.open(GroupNotEmptyDialogComponent, {
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  deleteGroup(id: number) {
    this.groupService.delete(id).subscribe(data => {
      this.ngOnInit();
    },error => {
      this.alertMessage();
    });

  }

  openCourse(id: any) {
    this.router.navigateByUrl('admin/groups/' + id + '/courses')
  }

  getGroups(event: PageEvent) {
    this.groupService.getGroups(event).subscribe(
      response => {
        this.groups = response.content;
        this.pageIndex = response.pageIndex;
        this.pageSize = response.size;
        this.length = response.totalElements;
      }
    );
    return event;
  }
}
