import { Injectable } from '@angular/core';
import {AppConfig} from "../../common/app-config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PageEvent} from "@angular/material/paginator";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private url =AppConfig.API_ADMIN_ENDPOINT + 'courses'
  constructor(private http: HttpClient) { }

  getCourses(event: PageEvent): Observable<any> {
    const params = new HttpParams()
      .set('page', event.pageIndex)
      .set('size', event.pageSize)
    return this.http.get(this.url, {params});
  }
}
