import {Injectable} from '@angular/core';
import {AppConfig} from '../common/app-config';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Question} from "../models/question.model";

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

  create(question: Question) {
    return this.http.post(this.questionUrl, question)
  }

  deleteById(id: any) {
    return this.http.delete(this.questionUrl+`${id}`)
  }

}
