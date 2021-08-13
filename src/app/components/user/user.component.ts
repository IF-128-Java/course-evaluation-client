import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/user.model';

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

  invalidFirstName: boolean = false;
  invalidLastName: boolean = false;

  oldPassword: string = '';
  newPassword: string = '';

  invalidOldPassword: boolean = false;
  invalidNewPassword: boolean = false;

  OldPasswordNotMatch: boolean = false;

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
    this.userService.update(data).subscribe(() => {
        this.reloadPage();
      },
      error => {
        console.log(error);

        this.invalidFirstName = false;
        this.invalidLastName = false;

        if(error.error.error === 'MethodArgumentNotValidException'){
          if (error.error.message.includes("firstName")){
            this.invalidFirstName = true;
          }

          if (error.error.message.includes("lastName")){
            this.invalidLastName = true;
          }
        }
      }
    );
  }

  updatePassword(): void{
    const data = {
      oldPassword : this.oldPassword,
      newPassword: this.newPassword
    }
    this.userService.updatePassword(data).subscribe(() => {
        this.reloadPage();
      },
      error => {
        console.log(error);
        if(error.error.error === 'InvalidOldPasswordException'){
          this.OldPasswordNotMatch = true;
        }

        this.invalidOldPassword = false;
        this.invalidNewPassword = false;

        if(error.error.error === 'MethodArgumentNotValidException'){
          if (error.error.message.includes("oldPassword")){
            this.invalidOldPassword = true;
          }

          if (error.error.message.includes("newPassword")){
            this.invalidNewPassword = true;
          }
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

    this.invalidFirstName = false;
    this.invalidLastName = false;
  }

  showUpdatePasswordComponent(): void{
    this.profileComponent = !this.profileComponent;
    this.updatePasswordComponent = !this.updatePasswordComponent;

    this.OldPasswordNotMatch = false;

    this.oldPassword = '';
    this.newPassword = '';

    this.invalidOldPassword = false;
    this.invalidNewPassword = false;
  }

  reloadPage() {
    window.location.reload();
  }
}
