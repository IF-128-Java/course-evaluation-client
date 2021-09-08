import {Component, OnInit} from '@angular/core';
import {SignUpInfo} from '../../auth/sign-up-info';
import {AuthService} from '../../auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo | undefined;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  isUsing2FA = false;
  qrCodeImage: any = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.using2FA){
      this.isUsing2FA = true;
    }

    this.signupInfo = new SignUpInfo(
      this.form.firstName,
      this.form.lastName,
      this.form.email,
      this.form.password,
      this.form.confirmPassword,
      this.isUsing2FA);
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        if(data.using2FA){
          this.qrCodeImage = data.qrCodeImage;
        }
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        if (error.error.fields) {
          this.errorMessage = error.error.fields.Passwords
        }
        else if (error.error.message) {
          this.errorMessage = error.error.message;
        } else this.errorMessage = error.error;
        this.isSignUpFailed = true;
      }
    );
  }
}
