import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private adminUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
}
