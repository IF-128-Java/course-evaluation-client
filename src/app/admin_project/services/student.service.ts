import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppConfig} from '../../common/app-config';
import {Observable} from 'rxjs';
import {StudentDto} from '../models/student-dto.model';
import {PageEvent} from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = AppConfig.API_ADMIN_ENDPOINT + 'students';

  constructor(private http: HttpClient) {
  }

  getStudentCandidates(): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(this.url + '/candidates');
  }

  getAllStudents(event: PageEvent): Observable<any> {
    const params = new HttpParams()
      .set('page', event.pageIndex)
      .set('size', event.pageSize)
    return this.http.get(this.url, {params});
  }
}
