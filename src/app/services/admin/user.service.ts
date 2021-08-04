import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConfig} from '../common/app-config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private adminUrl = AppConfig.API_ENDPOINT+'users';

  constructor(private http: HttpClient) { }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.adminUrl);
  }


}
