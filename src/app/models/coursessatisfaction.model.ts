export class Coursessatisfaction {
  courseId?: string;
  feedbackId?: string;
  satisfaction?: number;

  constructor(courseId: string, feedbackId: string, satisfaction: number) {

    this.courseId = courseId
    this.feedbackId = feedbackId;
    this.satisfaction = satisfaction;

  }
  }
