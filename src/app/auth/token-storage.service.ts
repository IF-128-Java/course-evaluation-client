import { Injectable } from '@angular/core';
import  jwt_decode from 'jwt-decode';
import {AppConfig} from '../common/app-config';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<any> = [];

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(AppConfig.TOKEN_KEY);
    window.sessionStorage.setItem(AppConfig.TOKEN_KEY, token);

    console.log(JSON.parse(this.decodeToken(token)).role);
  }

  public getToken(): string {
    return <string>sessionStorage.getItem(AppConfig.TOKEN_KEY);
  }

  public saveUsername(token: string) {
    window.sessionStorage.removeItem(AppConfig.USERNAME_KEY);
    window.sessionStorage.setItem(AppConfig.USERNAME_KEY, JSON.parse(this.decodeToken(token)).sub);
  }

  public getUsername(): string {
    return <string>sessionStorage.getItem(AppConfig.USERNAME_KEY);
  }

  public saveAuthorities(token: string) {
    window.sessionStorage.removeItem(AppConfig.AUTHORITIES_KEY);
    window.sessionStorage.setItem(AppConfig.AUTHORITIES_KEY,JSON.parse(this.decodeToken(token)).role );
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AppConfig.TOKEN_KEY)) {
        this.roles=JSON.parse(this.decodeToken(this.getToken())).role;
    }
    return this.roles;
  }

  decodeToken(token: string | null): string {
    return JSON.stringify(jwt_decode(<string>token));
  }

}
