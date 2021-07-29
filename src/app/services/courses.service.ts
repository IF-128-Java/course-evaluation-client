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

  getAll(): Observable<any> {
    return this.http.get(AppConfig.API_ENDPOINT, {responseType: 'text'});
  }

  get(id: number): Observable<any> {
    return this.http.get(`${AppConfig.API_ENDPOINT}/${id}`, {responseType: 'text'});
  }

  create(data: any): Observable<any> {
    return this.http.post(AppConfig.API_ENDPOINT, {responseType: 'text'});
  }

  update(id: number | any, data: any): Observable<any> {
    return this.http.put(`${AppConfig.API_ENDPOINT}/${id}`, {responseType: 'text'});
  }

  delete(id: number | any): Observable<any> {
    return this.http.delete(AppConfig.API_ENDPOINT, {responseType: 'text'});
  }

  findByCourseName(courseName: string): Observable<any> {
    return this.http.get(`${AppConfig.API_ENDPOINT}?courseName=${courseName}`, {responseType: 'text'});
  }
}
