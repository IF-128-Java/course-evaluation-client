import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from '../common/app-config';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class UsersService{

  private usersUrl = AppConfig.API_ENDPOINT + 'users/';
  constructor(private  http: HttpClient) { }

  get(id: number): Observable<any> {
    return this.http.get(`${this.usersUrl}${id}`, {responseType: 'json'});
  }

  update(id: number | any, data: any): Observable<any> {
    return this.http.patch(`${this.usersUrl}${id}`, data, httpOptions);
  }

  updatePassword(id: number | any, data: any): Observable<any> {
    return this.http.patch(`${this.usersUrl}${id}/update-password`, data, httpOptions);
  }
}
