import { Injectable } from '@angular/core';
import {AppConfig} from '../common/app-config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {PageEvent} from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationUrl = AppConfig.API_ENDPOINT + 'notification/';

  constructor(private http: HttpClient) {

  }
  getUsersByFeedbackRequest(event: PageEvent, id: number): Observable<any> {
    const params = new HttpParams()
      .set('page', event.pageIndex)
      .set('size', event.pageSize);
    return this.http.get(this.notificationUrl + 'fbrequest/' + id + '/students',{params});
  }

  sendNotificationToUser(fbrId: number, email: string){
    return this.http.post(this.notificationUrl + 'fbrequest/' + fbrId + '/student', email);
  }

  sendNotificationToAvaliableUsers(fbrId: number, students: User[]) {
    return this.http.post(this.notificationUrl + 'fbrequest/' + fbrId + '/students', students);
  }
}
