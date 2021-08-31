import {FbrStatus} from "./fbr-status.model";


export class FeedbackRequest {
  id: number;
  feedbackDescription: string;
  startDate: string;
  endDate: string;
  course: number;
  status: FbrStatus;

  constructor(id: number, feedbackDescription: string, startDate: string, endDate: string, course: number, status: FbrStatus) {
    this.id = id;
    this.feedbackDescription = feedbackDescription;
    this.startDate = startDate;
    this.endDate = endDate;
    this.course = course;
    this.status = status;
  }
}
