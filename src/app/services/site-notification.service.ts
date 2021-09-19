import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from '../common/app-config';

@Injectable({
  providedIn: 'root'
})
export class SiteNotificationService{

  constructor(private  http: HttpClient) { }

  setReviewedSiteNotification(id: number){
    return this.http.patch(`${AppConfig.API_ENDPOINT}site_notifications/${id}`, {});
  }

  getSiteNotifications(): Observable<any> {
    return this.http.get(`${AppConfig.API_ENDPOINT}site_notifications`, {responseType: 'json'});
  }
}
