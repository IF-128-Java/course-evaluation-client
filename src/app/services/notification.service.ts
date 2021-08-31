import { Injectable } from '@angular/core';
import {AppConfig} from '../common/app-config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationUrl = AppConfig.API_ENDPOINT + 'notification/';

  constructor(private http: HttpClient) {

  }

  getUsersByFeedbackRequest(id: number): Observable<any> {
    return this.http.get(this.notificationUrl + 'fbrequest/' + id + '/students');
  }

  sendNotificationToUser(fbrId: number, email: string){
    return this.http.post(this.notificationUrl + 'fbrequest/' + fbrId + '/student', email);
  }

  sendNotificationToAvaliableUsers(fbrId: number, students: User[]) {
    return this.http.post(this.notificationUrl + 'fbrequest/' + fbrId + '/students', students);
  }
}
