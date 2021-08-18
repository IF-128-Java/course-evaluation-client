import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "../../../services/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'dialog-for-update-user-profile-picture',
  templateUrl: 'dialog-for-update-user-profile-picture.html',
})
export class DialogForUpdateUserProfilePicture {

  emptyImage: boolean = false;
  invalidImageType: boolean = false;

  private selectedFile: File | undefined;

  constructor(
    private dialogRef: MatDialogRef<DialogForUpdateUserProfilePicture>,
    private userService: UsersService,
    private _snackBar: MatSnackBar,
    ) {}

  public onFileChanged(event : any){
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if(this.selectedFile === undefined){
      this.emptyImage = true;
      return
    }

    const uploadImageData = new FormData();

    uploadImageData.append('image', this.selectedFile, this.selectedFile.name);

    this.userService.updatePicture(uploadImageData).subscribe(() => {
        this._snackBar.open('Profile picture was updated!', 'Close');
        window.location.reload();
      },
      error => {
        console.log(error);

        this.emptyImage = false;

        if(error.error.error === 'ConstraintViolationException'){
          this.invalidImageType = true;
        }
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
