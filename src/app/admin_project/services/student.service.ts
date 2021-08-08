import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfig} from '../../common/app-config';
import {Observable} from 'rxjs';
import {StudentDto} from '../models/student-dto.model';

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

  getAllStudents(): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(this.url);
  }
}
