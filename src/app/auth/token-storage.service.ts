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
    if (localStorage.getItem(AppConfig.TOKEN_KEY)) {
      return JSON.parse(this.decodeToken(this.getToken())).sub;
    }
    return <string>localStorage.getItem(AppConfig.USERNAME_KEY);
  }

  public getActive2FA():boolean {
    if (localStorage.getItem(AppConfig.TOKEN_KEY)) {
      console.log(JSON.parse(this.decodeToken(this.getToken())));
      return JSON.parse(this.decodeToken(this.getToken())).authenticated;
    }
    return false;
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

  public saveId(token: string){
    window.localStorage.removeItem(AppConfig.ID_KEY);
    window.localStorage.setItem(AppConfig.ID_KEY, JSON.parse(this.decodeToken(token)).id);
  }

  public getId(): string{
    if (localStorage.getItem(AppConfig.TOKEN_KEY)) {
      return JSON.parse(this.decodeToken(this.getToken())).id;
    }
    return <string>localStorage.getItem(AppConfig.ID_KEY);
  }

  decodeToken(token: string | null): string {
    return JSON.stringify(jwt_decode(<string>token));
  }

}
