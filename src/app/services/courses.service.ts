import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../models/course.model";

const baseUrl = 'http://localhost:8080/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private  http: HttpClient) { }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(baseUrl);
  }

  get(id: number): Observable<Course> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<Course> {
    return this.http.delete(baseUrl);
  }

  findByCourseName(courseName: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${baseUrl}?courseName=${courseName}`);
  }
}
