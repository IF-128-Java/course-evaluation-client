

export class FeedbackRequest {
  id: number;
  feedbackDescription: string;
  startDate: string;
  endDate: string;
  course: number;

  constructor(id: number, feedbackDescription: string, startDate: string, endDate: string, course: number) {
    this.id = id;
    this.feedbackDescription = feedbackDescription;
    this.startDate = startDate;
    this.endDate = endDate;
    this.course = course;
  }
}
