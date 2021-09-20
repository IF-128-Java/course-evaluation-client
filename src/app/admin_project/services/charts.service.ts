import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfig} from '../../common/app-config';
import {Observable} from 'rxjs';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private urlUsersRoles = AppConfig.API_ANALYTICS_ENDPOINT + 'users-roles';
  private urlCoursesUsers = AppConfig.API_ANALYTICS_ENDPOINT + 'users-in-course';
  private urlComplexChart = AppConfig.API_ANALYTICS_ENDPOINT + 'complex-chart';
  private urlSplineChart = AppConfig.API_ANALYTICS_ENDPOINT + 'spline-chart';

  constructor(private http: HttpClient) { }

  getUsersRolesChart(): Observable<any>{
    return this.http.get(this.urlUsersRoles, httpOptions);
  }

  getUsersInCourseChart(): Observable<any>{
    return this.http.get(this.urlCoursesUsers, httpOptions);
  }

  getComplexChartData(): Observable<any>{
    return this.http.get(this.urlComplexChart, httpOptions);
  }

  getSplineChartData(): Observable<any>{
    return this.http.get(this.urlSplineChart, httpOptions);
  }
}
