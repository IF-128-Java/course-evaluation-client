import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from '../../common/app-config';
import {UserDto} from '../models/user-dto.model';
import {PageEvent} from '@angular/material/paginator';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = AppConfig.API_ADMIN_ENDPOINT + 'users';
  private teachersUrl = AppConfig.API_ENDPOINT + 'teachers';


  constructor(private http: HttpClient) {
  }

  getUserList(filter: string, event: PageEvent, order: string, direction: string): Observable<any> {
    const params = new HttpParams()
      .set('page', event.pageIndex)
      .set('size', event.pageSize)
      .set('filter',filter)
      .set('direction',direction)
      .set('order',order)
    return this.http.get(this.url, {params});
  }

  getUser(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  addRoles(user: UserDto): Observable<any> {
    return this.http.patch(this.url + '/add-roles', user, httpOptions)
  }
  getTeachers(): Observable<any> {
    return this.http.get(this.teachersUrl)
  }
}
