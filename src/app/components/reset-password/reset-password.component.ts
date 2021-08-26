import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute} from "@angular/router";
import {ResetPasswordInfo} from "./reset-password-info";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  errorMessage: '';
  form: any = {};
  resetPasswordInfo: ResetPasswordInfo ;
  public isSend: boolean=false;
  public isResetMessageReceived= false;
  public isRecoveryFailed= false;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  PasswordForm: any = {};
  private resetToken: string;

  constructor(private authService: AuthService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetToken = this.activeRoute.snapshot.queryParams.token;
    if(this.resetToken) {
      this.isResetMessageReceived = true;
    }
  }

  onSubmit() {
    if(!this.resetToken) {
      this.authService.sendResetPasswordMail(this.form.username)
        .subscribe(() => this.isSend = true,
          error => {
            console.log(error);
            if (error.error.message) {
              this.errorMessage = error.error.message;
            } else this.errorMessage = error.error;
            this.form.isSend = false;
          }
        );
    } else {
      this.resetPasswordInfo = new ResetPasswordInfo(
        this.PasswordForm.password,
        this.PasswordForm.confirmPassword,
        this.resetToken
      )
      this.authService.changePassword(this.resetPasswordInfo).subscribe(
        ()=> window.location.href="login",
        error => {
          console.log(error);
          if (error.error.fields) {
            this.errorMessage = error.error.fields.Passwords
          }
          else if (error.error.message) {
            this.errorMessage = error.error.message;
          } else this.errorMessage = error.error;
          this.isRecoveryFailed = true;
        }
      )
    }
  }
}
