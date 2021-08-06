import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from '../../common/app-config';
import {UserDto} from '../models/user-dto.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private adminUrl = AppConfig.API_ADMIN_ENDPOINT + 'users';

  constructor(private http: HttpClient) {
  }

  getUserList(): Observable<any> {
    return this.http.get(this.adminUrl);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(this.adminUrl + '/' + id);
  }

  addRoles(user: UserDto): Observable<any> {
    return this.http.patch(this.adminUrl + '/add-roles', user, httpOptions)
  }
}
