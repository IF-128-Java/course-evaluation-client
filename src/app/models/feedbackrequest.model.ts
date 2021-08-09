

export class FeedbackRequest {
  id?: number;
  feedbackDescription: string;
  startDate: string;
  endDate: string;
  course: string;

  constructor(feedbackDescription: string, startDate: string, endDate: string, course: string) {
    this.feedbackDescription = feedbackDescription;
    this.startDate = startDate;
    this.endDate = endDate;
    this.course = course;
  }
}
