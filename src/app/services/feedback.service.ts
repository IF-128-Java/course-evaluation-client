import {Injectable} from '@angular/core';
import {AppConfig} from '../common/app-config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PageEvent} from "@angular/material/paginator";
import {Observable} from "rxjs";
import {Feedback} from "../models/feedback.model";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackUrl = AppConfig.API_ENDPOINT + 'feedback/';
  private addFeedbackUrl = AppConfig.API_ENDPOINT + 'feedback/student/';

  constructor(private http: HttpClient) {

  }

  getFeedbacksByFeedbackRequestId(event: PageEvent, requestId: any): Observable<any> {
    const params = new HttpParams()
      .set('page', event.pageIndex)
      .set('size', event.pageSize)
    return this.http.get(this.feedbackUrl + 'feedback_request/' + requestId, {params});
  }

  getFeedbackById(id:any): Observable<any>{
    return this.http.get(this.feedbackUrl + id)
  }

  create(feedback: Feedback) {
    return this.http.post(this.addFeedbackUrl, feedback)
  }

}
