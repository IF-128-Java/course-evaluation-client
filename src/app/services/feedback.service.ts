import {Injectable} from '@angular/core';
import {AppConfig} from '../common/app-config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PageEvent} from "@angular/material/paginator";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackUrl = AppConfig.API_ENDPOINT + 'feedback/';

  constructor(private http: HttpClient) {

  }

  getFeedbacksByFeedbackRequestId(event: PageEvent, requestId: any): Observable<any> {
    const params = new HttpParams()
      .set('page', event.pageIndex)
      .set('size', event.pageSize)
    return this.http.get(this.feedbackUrl + 'feedback_request/' + requestId, {params});
  }
}
