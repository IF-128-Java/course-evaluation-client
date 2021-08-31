import {Injectable} from '@angular/core';
import {AppConfig} from '../common/app-config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FeedbackRequest} from '../models/feedbackrequest.model';
import {Question} from '../models/question.model';
import {Observable} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class FeedbackrequestService {
  private feedbackRequestUrl = AppConfig.API_ENDPOINT + 'feedback_request/';

  constructor(private http: HttpClient) {

  }

  create(feedbackRequest: FeedbackRequest) {
    return this.http.post(this.feedbackRequestUrl, feedbackRequest)
  }

  addQuestionToFeedbackRequest(id: any, questions: Question[]) {
    return this.http.post(this.feedbackRequestUrl + `${id}` + '/questions', questions)
  }

  getFeedbackRequestByCourseId(id: number): Observable<FeedbackRequest[]> {
    return this.http.get<FeedbackRequest[]>(this.feedbackRequestUrl + 'course/' + id);
  }

  getFbRequests(event: PageEvent, courseId: any): Observable<any> {
    const params = new HttpParams()
      .set('page', event.pageIndex)
      .set('size', event.pageSize)
    return this.http.get(this.feedbackRequestUrl + 'course/' + courseId, {params});
  }

  getFeedbackRequestById(id: number): Observable<any> {
    return this.http.get(this.feedbackRequestUrl + id);
  }

  getQuestionsByFeedbackRequestId(id: number): Observable<any>{
    return this.http.get(this.feedbackRequestUrl + id + '/questions')
  }

  update(feedbackRequest: FeedbackRequest): Observable<any>{
   return this.http.put(this.feedbackRequestUrl, feedbackRequest);
  }

}
