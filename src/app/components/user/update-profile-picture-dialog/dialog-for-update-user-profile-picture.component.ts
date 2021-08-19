import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "../../../services/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'dialog-for-update-user-profile-picture',
  templateUrl: 'dialog-for-update-user-profile-picture.component.html',
  styleUrls: ['dialog-for-update-user-profile-picture.component.css']
})
export class DialogForUpdateUserProfilePicture {

  emptyImage: boolean = false;
  invalidImageType: boolean = false;
  invalidImageSize: boolean = false;
  invalidImageSizeMessage: string = '';

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
    this.invalidImageSize = false;
    this.invalidImageType = false;

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
          if(error.error.message === 'Download PNG or JPEG only!'){
            this.invalidImageType = true;
          }else {
            this.invalidImageSize = true;
            this.invalidImageSizeMessage = error.error.message;
          }
        }
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
