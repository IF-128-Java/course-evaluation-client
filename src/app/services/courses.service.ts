import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from '../common/app-config';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesUrl = AppConfig.API_ENDPOINT + 'courses/';
  constructor(private  http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.coursesUrl);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.coursesUrl}${id}`);
  }

  create(data: any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.coursesUrl, data, httpOptions);
  }

  update(id: number | any, data: any): Observable<any> {
    return this.http.put(`${AppConfig.API_ENDPOINT}/${id}`, {responseType: 'json'});
  }

  delete(id: number | any): Observable<any> {
    return this.http.delete(AppConfig.API_ENDPOINT, {responseType: 'json'});
  }

  findByCourseName(courseName: string): Observable<any> {
    return this.http.get(`${AppConfig.API_ENDPOINT}?courseName=${courseName}`, {responseType: 'json'});
  }
}
