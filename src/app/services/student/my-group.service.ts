import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from '../../common/app-config';
import {PageEvent} from "@angular/material/paginator";

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class MyGroupService{

  private usersUrl = AppConfig.API_ENDPOINT + 'students/';
  private usersUrl1 = AppConfig.API_ENDPOINT + 'students/group/';
  private usersUrl2 = AppConfig.API_ENDPOINT + 'courses/group/';
  private usersUrl3 = AppConfig.API_ENDPOINT + 'courses/current/group/';
  private usersUrl4 = AppConfig.API_ENDPOINT + 'courses/available/';

  constructor(private  http: HttpClient) { }

  get(id: number): Observable<any> {
    return this.http.get(`${this.usersUrl}${id}`, {responseType: 'json'});
  }

  getStudentsByGroupId(id: number): Observable<any> {
    return this.http.get(`${this.usersUrl1}${id}`, {responseType: 'json'});
  }

  getFinishedCoursesOfGroup(id: number): Observable<any> {
    return this.http.get(`${this.usersUrl2}${id}`, {responseType: 'json'});
  }

  getCurrentCoursesOfGroup(id: number): Observable<any> {
    return this.http.get(`${this.usersUrl3}${id}`, {responseType: 'json'});
  }

  getAvailableCourses(): Observable<any> {
    return this.http.get(`${this.usersUrl4}`, {responseType: 'json'});
  }
}