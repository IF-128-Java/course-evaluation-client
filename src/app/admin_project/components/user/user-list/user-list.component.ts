import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {UserDto} from '../../../models/user-dto.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UpdateRoleComponent} from '../update-role/update-role.component';
import {PageEvent} from '@angular/material/paginator';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: UserDto[] = [];
  public user: UserDto | undefined;
  public displayedColumns: string[] = ['First Name', 'Last Name', 'Roles','Action'];
  pageEvent: PageEvent = new PageEvent();
  pageIndex?: number;
  pageSize?: number;
  length?: number;
  searchUsers = new FormControl('');
  searchUsersFilter: string = '';

  constructor(private userService: UserService, public dialog: MatDialog, public dialModRef: MatDialogRef<any>) {
  }

  ngOnInit(): void {
   this.getUsers(this.getUsersPageEvent(this.pageEvent));
  }

  openDialog(id: number) {
    this.userService.getUser(id).subscribe(data => {
        this.user = data;
        const dialogRef = this.dialog.open(UpdateRoleComponent, {
          width: '250px',
          data: this.user
        });
        dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
        });
      }
    );
  }

  public getUsers(event: PageEvent) {
    this.userService.getUserList(this.searchUsersFilter,event).subscribe(
      response => {
        this.users = response.content;
        this.pageIndex = response.number;
        this.pageSize = response.size;
        this.length = response.totalElements;
      }
    );
    return event;
  }
  public getSimpleRolesName(user:UserDto):string{
    return <string>user.roles?.map(r => r.substring(5)).join(', ');
  }

  getUsersPageEvent(event: PageEvent) {
    if (this.pageIndex || this.pageSize) {
      return event;
    }
    event.pageIndex = 0;
    event.pageSize = 10;
    return event;
  }

  filterUsers(value: any) {
    this.searchUsersFilter = value;
    this.pageEvent.pageIndex = 0;
    this.ngOnInit()
  }
}
