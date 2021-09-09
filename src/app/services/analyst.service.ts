import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConfig} from "../common/app-config";

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AnalystService {

  private usersUrl = AppConfig.API_ANALYTICS_ENDPOINT_BASE + 'coursesatisfaction';

  constructor(private  http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(`${this.usersUrl}`, {responseType: 'json'});
  }

}
