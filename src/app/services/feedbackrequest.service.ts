import {Injectable} from '@angular/core';
import {AppConfig} from '../common/app-config';
import {HttpClient} from '@angular/common/http';
import {FeedbackRequest} from '../models/feedbackrequest.model';
import {Question} from '../models/question.model';

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
    return this.http.post(this.feedbackRequestUrl +  `${id}` +'/questions', questions)
  }

}
