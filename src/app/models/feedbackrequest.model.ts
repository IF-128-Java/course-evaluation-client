

export class FeedbackRequest {
  id?: number;
  feedbackDescription: string;
  startDate: string;
  endDate: string;
  course: number;

  constructor(feedbackDescription: string, startDate: string, endDate: string, course: number) {
    this.feedbackDescription = feedbackDescription;
    this.startDate = startDate;
    this.endDate = endDate;
    this.course = course;
  }
}
