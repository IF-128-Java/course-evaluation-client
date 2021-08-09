import {Injectable} from '@angular/core';
import {AppConfig} from '../common/app-config';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionUrl = AppConfig.API_ENDPOINT + 'questions/';

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<any> {
    return this.http.get(this.questionUrl);
  }

}
