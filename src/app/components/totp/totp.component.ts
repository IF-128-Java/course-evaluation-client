import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../auth/token-storage.service";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-totp',
  templateUrl: './totp.component.html',
  styleUrls: ['./totp.component.css']
})
export class TotpComponent implements OnInit {
  errorMessage: any;
  roles: string[];
  username: string | undefined;
  id: string | undefined;
  form: any = {};
  using2FA: boolean;
  isReset: boolean;

  constructor(private tokenStorage: TokenStorageService, private auth: AuthService,private router :Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      console.log(this.roles)
      this.using2FA = this.tokenStorage.getActive2FA();
      console.log(this.using2FA)
      this.username = this.tokenStorage.getUsername();
      console.log(this.username)
      this.id = this.tokenStorage.getId();
      console.log(this.tokenStorage.getToken());
    }
  }

  onSubmit() {
    console.log(this.form.verificationCode);
    this.auth.verify2FaCode(this.form.verificationCode, this.tokenStorage.getUsername())
      .subscribe(data => {
          this.isReset = true;
          console.log(data)
          this.tokenStorage.saveToken(data.token);
          window.location.reload();
        }
        ,
        error => {
          console.log(error);
          if (error.error.message) {
            this.errorMessage = error.error.message;
          } else this.errorMessage = error.error;
          this.form.isSend = false;
        })

    console.log(this.tokenStorage.getToken());
  }
}
