import { Injectable } from '@angular/core';
import  jwt_decode from 'jwt-decode';
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

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
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

    console.log(JSON.parse(this.decodeToken(token)).role);
  }

  public getToken(): string {
    return <string>sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return <string>sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(token: string) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY,JSON.parse(this.decodeToken(token)).role );
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {

        this.roles=JSON.parse(this.decodeToken(this.getToken())).role;

    }

    return this.roles;
  }

  decodeToken(token: string | null): string {
    return JSON.stringify(jwt_decode(<string>token));
  }

}
