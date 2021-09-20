export class Coursessatisfaction {

  id: number;
  courseName: string;
  feedbackName: string;
  satisfaction: number;

  constructor(id: number, courseName: string, feedbackName: string, satisfaction: number) {

    this.id=id;
    this.courseName = courseName;
    this.feedbackName = feedbackName;
    this.satisfaction = satisfaction;

  }
  }
