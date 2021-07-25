import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthLoginInfo} from './auth-login-info';
import {SignUpInfo} from './sign-up-info';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenStorageService} from './token-storage.service';
import {AppConfig} from '../common/app-config';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = AppConfig.API_ENDPOINT + 'auth/login';
  private signupUrl = AppConfig.API_ENDPOINT + 'auth/signup';

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
}
