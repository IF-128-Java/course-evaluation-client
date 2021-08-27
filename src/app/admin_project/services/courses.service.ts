import { Injectable } from '@angular/core';
import {AppConfig} from '../../common/app-config';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {PageEvent} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {A} from "@angular/cdk/keycodes";

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private url = AppConfig.API_ADMIN_ENDPOINT + 'courses';
  private editUrl = AppConfig.API_ADMIN_ENDPOINT + 'courses/edit';
  private findUrl = AppConfig.API_ADMIN_ENDPOINT + 'courses/name';
  constructor(private http: HttpClient) { }

  getCourses(event: PageEvent, orderBy: string, direction: string): Observable<any> {
    const params = new HttpParams()
      .set('page', event.pageIndex)
      .set('size', event.pageSize)
      .set('orderBy', orderBy)
      .set('direction', direction)
    return this.http.get(this.url, {params});
  }
  createCourse(data: any): Observable<any>{
    return this.http.post(this.url, data, httpOptions);
  }
  editCourse(id: any, data: any): Observable<any>{
    return this.http.patch(`${this.editUrl}/${id}`, data, httpOptions)
  }
  getCourse(id: any): Observable<any>{
    return this.http.get(`${this.url}/${id}`, httpOptions)
  }
  findByCourseName(courseName: string): Observable<any> {
    return this.http.get(`${this.findUrl}/${courseName}`);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, httpOptions);
  }

}
