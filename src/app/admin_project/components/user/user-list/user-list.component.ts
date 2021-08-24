import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {UserDto} from '../../../models/user-dto.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UpdateRoleComponent} from '../update-role/update-role.component';
import {PageEvent} from '@angular/material/paginator';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {
  public users: UserDto[] = [];
  public user: UserDto | undefined;
  public displayedColumns: string[] = ['First Name', 'Last Name', 'Roles','Action'];
  pageEvent: PageEvent = new PageEvent();
  pageIndex?: number;
  pageSize?: number;
  length?: number;
  searchUsers = new FormControl('');
  searchUsersFilter: string = '';
  sorting: 'first_name' | 'last_name' = 'last_name'
  order:string = 'last_name';
  direction:string='ASC';
  constructor(private userService: UserService, public dialog: MatDialog, public dialModRef: MatDialogRef<any>, private fb: FormBuilder) {

  }

  ngAfterViewInit(): void {
   this.getUsers(this.getUsersPageEvent(this.pageEvent),this.order,this.direction);
  }

  openDialog(id: number) {
    this.userService.getUser(id).subscribe(data => {
        this.user = data;
        const dialogRef = this.dialog.open(UpdateRoleComponent, {
          width: '250px',
          data: this.user
        });
        dialogRef.afterClosed().subscribe(result => {
          this.ngAfterViewInit();
        });
      }
    );
  }

  public getUsers(event: PageEvent, order: string, direction: string) {
    this.userService.getUserList(this.searchUsersFilter,event,order,direction).subscribe(
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
    this.ngAfterViewInit()
  }

  changeOrder() {
    if (this.direction === 'ASC'){
      this.direction = 'DESC'
    }else{
      this.direction = 'ASC'
    }
    this.ngAfterViewInit()
  }

  onChange(event: any) {
    this.order = event
    this.ngAfterViewInit()
  }
}
