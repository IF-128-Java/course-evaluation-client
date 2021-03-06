import {Component, OnInit} from '@angular/core';
import {AuthLoginInfo} from '../../auth/auth-login-info';
import {AuthService} from '../../auth/auth.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {AppConfig} from '../../common/app-config';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo | undefined;
  googleURL = AppConfig.GOOGLE_AUTH_URL;
  facebookURL = AppConfig.FACEBOOK_AUTH_URL;
  githubURL = AppConfig.GITHUB_AUTH_URL;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const token: string = <string>this.route.snapshot.queryParamMap.get('token');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    } else if (token) {
      this.isLoggedIn = true;
      this.tokenStorage.saveToken(token);

      this.roles = this.tokenStorage.getAuthorities();
      if (this.roles.includes('ROLE_ADMIN')) {
        this.router.navigate(['/admin/users']).then(() => {
          window.location.reload()
        })
      } else {
        window.location.href = "/login"
      }

    }

  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        console.log(data.token)

        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.token);
        this.tokenStorage.saveAuthorities(data.token);
        this.tokenStorage.saveId(data.token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        if (!this.tokenStorage.getActive2FA()) {
          this.router.navigate(['/totp']).then(()=>{
            window.location.reload()
          });
        }
        this.roles = this.tokenStorage.getAuthorities();
        if (this.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin/users']).then(() => {
            window.location.reload()
          })
        }
        if (this.roles.includes('ROLE_STUDENT')) {
          this.router.navigate(['/my-group']).then(() => {
            window.location.reload()
          })
        }

        this.reloadPage();
      },
      error => {
        console.log(error);
        if (error.error.message) {
          this.errorMessage = error.error.message;
        } else this.errorMessage = error.error;
        this.isLoginFailed = true;

      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

}
