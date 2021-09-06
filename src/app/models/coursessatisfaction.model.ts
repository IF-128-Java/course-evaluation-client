export class Coursessatisfaction {
  courseId?: number;
  feedbackId?: number;
  satisfaction?: number;

  constructor(courseId: number, feedbackId: number, satisfaction: number) {

    this.courseId = courseId
    this.feedbackId = feedbackId;
    this.satisfaction = satisfaction;

  }
  }
