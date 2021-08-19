import { Injectable } from '@angular/core';
import {AppConfig} from '../../common/app-config';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {PageEvent} from '@angular/material/paginator';
import {Observable} from 'rxjs';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private url = AppConfig.API_ADMIN_ENDPOINT + 'courses'
  constructor(private http: HttpClient) { }

  getCourses(event: PageEvent): Observable<any> {
    const params = new HttpParams()
      .set('page', event.pageIndex)
      .set('size', event.pageSize)
    return this.http.get(this.url, {params});
  }
  createCourse(data: any): Observable<any>{
    return this.http.post(this.url, data, httpOptions);
  }
  editCourse(id: any, data: any){
    return this.http.patch(`${this.url}/${id}`, data, httpOptions)
  }
}
