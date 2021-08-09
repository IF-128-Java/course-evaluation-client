import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {UserDto} from '../../../models/user-dto.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UpdateRoleComponent} from '../update-role/update-role.component';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: UserDto[] = [];
  public user: UserDto | undefined;
  public displayedColumns: string[] = ['Id', 'First Name', 'Last Name', 'Roles'];
  pageEvent?: PageEvent;
  pageIndex?: number;
  pageSize?: number;
  length?: number;

  constructor(private userService: UserService, public dialog: MatDialog, public dialModRef: MatDialogRef<any>) {
  }

  ngOnInit(): void {
    var event = new PageEvent();
    event.pageIndex = 0;
    event.pageSize = 25;
    this.getUsers(event);
  }

  openDialog(id: number) {
    this.userService.getUser(id).subscribe(data => {
        this.user = data;
        const dialogRef = this.dialog.open(UpdateRoleComponent, {
          width: '250px',
          data: this.user
        });
        dialogRef.afterClosed().subscribe(result => {
          window.location.reload();
        });
      }
    );
  }

  public getUsers(event: PageEvent) {
    this.userService.getUserList(event).subscribe(
      response => {
        this.users = response.content;
        this.pageIndex = response.pageIndex;
        this.pageSize = response.size;
        this.length = response.totalElements;
      }
    );
    return event;
  }
}
