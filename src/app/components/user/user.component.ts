import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  currentUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    roles: [],
  };

  profileComponent: boolean = true;
  updateComponent: boolean = false;
  updatePasswordComponent: boolean = false;

  firstNameToUpdate: string = '';
  lastNameToUpdate: string = '';

  oldPassword: string = '';
  newPassword: string = '';

  invalidOldPassword: boolean = false;

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params.id);
  }

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
  ) { }

  getUser(id: number): void {
    this.userService.get(id).subscribe(data => {
        this.currentUser = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  update(): void{
    const data = {
      firstName : this.firstNameToUpdate,
      lastName: this.lastNameToUpdate
    }
    this.userService.update(this.route.snapshot.params.id, data).subscribe(response => {
        console.log(response);
        this.reloadPage();
      },
      error => {
        console.log(error);
      }
    );
  }

  updatePassword(): void{
    const data = {
      oldPassword : this.oldPassword,
      newPassword: this.newPassword
    }
    this.userService.updatePassword(this.route.snapshot.params.id, data).subscribe(response => {
        console.log(response);
        this.reloadPage();
      },
      error => {
        console.log(error);
        if(error.error.error === 'InvalidOldPasswordException'){
          this.invalidOldPassword = true;
        }
      }
    );
  }

  showProfileComponent(): void{
    this.profileComponent = !this.profileComponent;
    this.updateComponent = false
    this.updatePasswordComponent = false;
  }

  showUpdateComponent(): void{
    this.profileComponent = !this.profileComponent;
    this.updateComponent = !this.updateComponent;
    this.firstNameToUpdate = this.currentUser.firstName;
    this.lastNameToUpdate = this.currentUser.lastName;
  }

  showUpdatePasswordComponent(): void{
    this.profileComponent = !this.profileComponent;
    this.updatePasswordComponent = !this.updatePasswordComponent;
    this.invalidOldPassword = false;
    this.oldPassword = '';
    this.newPassword = '';
  }

  reloadPage() {
    window.location.reload();
  }
}
