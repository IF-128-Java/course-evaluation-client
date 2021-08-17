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

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit() {

    this.signupInfo = new SignUpInfo(
      this.form.firstName,
      this.form.lastName,
      this.form.email,
      this.form.password,
      this.form.confirmPassword);
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        if (error.error.message) {
          this.errorMessage = error.error.message;
        } else this.errorMessage = error.error;
        this.isSignUpFailed = true;
      }
    );
  }
}
