import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthLoginInfo} from './auth-login-info';
import {SignUpInfo} from './sign-up-info';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenStorageService} from './token-storage.service';
import {AppConfig} from '../common/app-config';
import {ResetPasswordInfo} from '../components/reset-password/reset-password-info';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = AppConfig.API_ENDPOINT + 'auth/login';
  private signupUrl = AppConfig.API_ENDPOINT + 'auth/reg';
  private confirmUrl = AppConfig.API_ENDPOINT + 'auth/confirm';
  private resetUrl = AppConfig.API_ENDPOINT + 'auth/restorePassword';
  private changePasswordUrl = AppConfig.API_ENDPOINT + 'auth/changePassword';
  private verify2FaUrl = AppConfig.API_ENDPOINT + 'auth/verify';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private tokenStorage: TokenStorageService) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<any> {
    return this.http.post(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<any> {
    return this.http.post(this.signupUrl, info, httpOptions);
  }

  public isAuthenticated(): boolean {
    const token = this.tokenStorage.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isConfirm(code: string): Observable<void> {
    return this.http.get<any>(this.confirmUrl + "?token="+  code);
  }

  public sendResetPasswordMail(email: string): Observable<any> {
    return this.http.get(this.resetUrl + "?email="+ email);
  }

  public changePassword(passwordResetInfo: ResetPasswordInfo): Observable<any> {
    return this.http.post(this.changePasswordUrl, passwordResetInfo,httpOptions)
  }

  public verify2FaCode(code: number, email: string): Observable<any> {
    console.log("invoke verify2faCode")
    return this.http.post(this.verify2FaUrl + "?email="+email+"&code="+code, httpOptions);
  }
}
