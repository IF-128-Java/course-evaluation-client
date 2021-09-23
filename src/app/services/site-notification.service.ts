import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from '../common/app-config';

@Injectable({
  providedIn: 'root'
})
export class SiteNotificationService{

  private site_notifications_url = AppConfig.API_ENDPOINT + 'site_notifications';

  constructor(private  http: HttpClient) { }

  setReviewedSiteNotification(id: number){
    return this.http.patch(`${this.site_notifications_url}/${id}`, {});
  }

  delete(id: number){
    return this.http.delete(`${this.site_notifications_url}/${id}`);
  }

  getSiteNotifications(): Observable<any> {
    return this.http.get(this.site_notifications_url, {responseType: 'json'});
  }
}
