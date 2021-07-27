import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../models/course.model";
import {AppConfig} from "../common/app-config";

// const baseUrl = 'http://localhost:8080/courses/';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private  http: HttpClient) { }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(AppConfig.API_ENDPOINT);
  }

  get(id: number): Observable<Course> {
    return this.http.get(`${AppConfig.API_ENDPOINT}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(AppConfig.API_ENDPOINT, data);
  }

  update(id: number | any, data: any): Observable<any> {
    return this.http.put(`${AppConfig.API_ENDPOINT}/${id}`, data);
  }

  delete(id: number | any): Observable<Course> {
    return this.http.delete(AppConfig.API_ENDPOINT);
  }

  findByCourseName(courseName: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${AppConfig.API_ENDPOINT}?courseName=${courseName}`);
  }
}
