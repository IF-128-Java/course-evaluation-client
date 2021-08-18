import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DialogForUpdateUserProfilePicture} from "./update-profile-picture-dialog/dialog-for-update-user-profile-picture.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  currentUser = {
    firstName: '',
    lastName: '',
    email: '',
  };

  profilePicture: string  = '';

  defaultProfilePicture: boolean = false;
  initials: string  = '';

  profileComponent: boolean = true;
  updateComponent: boolean = false;
  updatePasswordComponent: boolean = false;

  firstNameToUpdate: string = '';
  lastNameToUpdate: string = '';

  invalidFirstName: boolean = false;
  invalidLastName: boolean = false;

  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  invalidOldPassword: boolean = false;
  invalidNewPassword: boolean = false;

  hideOldPassword: boolean = true
  hideNewPassword: boolean = true
  hideConfirmNewPassword: boolean = true

  OldPasswordNotMatch: boolean = false;
  newPasswordsNotMatch: boolean = false;

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params.id);
  }

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  getUser(id: number): void {
    this.userService.get(id).subscribe(data => {
        if(data.profilePicture === null){
          this.initials = data.firstName.charAt(0) + data.lastName.charAt(0);
          this.defaultProfilePicture = true;
        }else{
          this.profilePicture = 'data:image/jpeg;base64,' + data.profilePicture;
        }
        this.currentUser = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  openDialog(): void {
    this.dialog.open(DialogForUpdateUserProfilePicture, {
      width: '370px',
    })
  }

  update(): void{
    const data = {
      firstName : this.firstNameToUpdate,
      lastName: this.lastNameToUpdate
    }
    this.userService.update(data).subscribe(() => {
        this._snackBar.open('User was updated!', 'Close');
        this.reloadPage();
      },
      error => {
        console.log(error);

        this.invalidFirstName = false;
        this.invalidLastName = false;

        if(error.error.error === 'MethodArgumentNotValidException'){
          if (error.error.fields.firstName){
            this.firstNameToUpdate = this.currentUser.firstName;
            this.invalidFirstName = true;
          }

          if (error.error.fields.lastName){
            this.lastNameToUpdate = this.currentUser.lastName;
            this.invalidLastName = true;
          }
        }
      }
    );
  }

  updatePassword(): void{
    this.invalidOldPassword = false;
    this.invalidNewPassword = false;

    if(this.newPassword !== this.confirmNewPassword){
      this.newPasswordsNotMatch = true;
      return;
    }

    const data = {
      oldPassword : this.oldPassword,
      newPassword: this.newPassword
    }
    this.userService.updatePassword(data).subscribe(() => {
        this._snackBar.open('Password was updated!', 'Close');
        this.reloadPage();
      },
      error => {
        console.log(error);

        this.newPassword = '';
        this.confirmNewPassword = '';
        this.newPasswordsNotMatch = false;

        if(error.error.error === 'InvalidOldPasswordException'){
          this.OldPasswordNotMatch = true;
          this.oldPassword = '';
        }

        if(error.error.error === 'MethodArgumentNotValidException'){
          this.OldPasswordNotMatch = false;

          if (error.error.fields.oldPassword){
            this.invalidOldPassword = true;
          }

          if (error.error.fields.newPassword){
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

    this.newPasswordsNotMatch = false;

    this.oldPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';

    this.hideOldPassword = true;
    this.hideNewPassword = true;
    this.hideConfirmNewPassword = true;

    this.invalidOldPassword = false;
    this.invalidNewPassword = false;
  }

  reloadPage() {
    window.location.reload();
  }
}
