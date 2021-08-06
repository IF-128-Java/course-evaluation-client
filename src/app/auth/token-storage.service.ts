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
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(AppConfig.TOKEN_KEY);
    window.localStorage.setItem(AppConfig.TOKEN_KEY, token);
  }

  public getToken(): string {
    return <string>localStorage.getItem(AppConfig.TOKEN_KEY);
  }

  public saveUsername(token: string) {
    window.localStorage.removeItem(AppConfig.USERNAME_KEY);
    window.localStorage.setItem(AppConfig.USERNAME_KEY, JSON.parse(this.decodeToken(token)).sub);
  }

  public getUsername(): string {
    return <string>localStorage.getItem(AppConfig.USERNAME_KEY);
  }

  public saveAuthorities(token: string) {
    window.localStorage.removeItem(AppConfig.AUTHORITIES_KEY);
    window.localStorage.setItem(AppConfig.AUTHORITIES_KEY,JSON.parse(this.decodeToken(token)).role );
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (localStorage.getItem(AppConfig.TOKEN_KEY)) {
        this.roles=JSON.parse(this.decodeToken(this.getToken())).role;
    }
    return this.roles;
  }

  decodeToken(token: string | null): string {
    return JSON.stringify(jwt_decode(<string>token));
  }

}
