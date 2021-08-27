import {AfterViewInit, Component} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {UserDto} from '../../../models/user-dto.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UpdateRoleComponent} from '../update-role/update-role.component';
import {PageEvent} from '@angular/material/paginator';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {
    public users: UserDto[] = [];
    public user: UserDto | undefined;
    public displayedColumns: string[] = ['First Name', 'Last Name', 'Roles', 'Action'];
    pageEvent: PageEvent = new PageEvent();
    pageIndex?: number;
    pageSize?: number;
    length?: number;
    searchUsers = new FormControl('');
    search: string = '';
    sorting: 'first_name' | 'last_name' = 'last_name'
    order: string = 'last_name';
    direction: string = 'ASC';
    filter: number[] = [0, 1, 2];

    filtering: FormGroup;

    constructor(private userService: UserService, public dialog: MatDialog, public dialModRef: MatDialogRef<any>, private fb: FormBuilder) {
        this.filtering = fb.group({
            adminRole: true,
            teacherRole: true,
            studentRole: true
        });
    }

    ngAfterViewInit(): void {
        this.getUsers(this.getUsersPageEvent(this.pageEvent), this.search, this.order, this.direction, this.filter);
        this.filtering.controls['studentRole'].valueChanges.subscribe(value => {
            this.setFilter(0, value)
        });
        this.filtering.controls['teacherRole'].valueChanges.subscribe(value => {
            this.setFilter(1, value)
        });
        this.filtering.controls['adminRole'].valueChanges.subscribe(value => {
            this.setFilter(2, value)
        });
    }

    setFilter(roleId: number, value: boolean) {
        const index = this.filter.indexOf(roleId, 0)
        if (!value) {
            if (index > -1) {
                this.filter = this.filter.filter(item => item != roleId)
            }
        } else {
            if (index === -1) {
                this.filter.push(roleId)
            }
        }
      this.pageEvent.pageIndex = 0;
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

    public getUsers(event: PageEvent, search: string, order: string, direction: string, filter: number[]) {
        this.userService.getUserList(search, event, order, direction, filter).subscribe(
            response => {
                this.users = response.content;
                this.pageIndex = response.number;
                this.pageSize = response.size;
                this.length = response.totalElements;

            }
        );
        return event;
    }

    public getSimpleRolesName(user: UserDto): string {
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
        this.search = value;
        this.pageEvent.pageIndex = 0;
        this.ngAfterViewInit()
    }

    changeOrder() {
        if (this.direction === 'ASC') {
            this.direction = 'DESC'
        } else {
            this.direction = 'ASC'
        }
        this.ngAfterViewInit()
    }

    onChange(event: any) {
        this.order = event
        this.ngAfterViewInit()
    }

    filterChange(event: MatCheckboxChange, roleId: number) {
        this.setFilter(roleId, event.checked)
        this.ngAfterViewInit()
    }
}
