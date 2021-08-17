export class Answers {
  id:number;
  rate: number;
  questionId: number;
  questionName: string;
  feedbackId: number;

  constructor(id: number, rate: number, questionId: number, questionName: string, feedbackId: number) {
    this.id = id;
    this.rate = rate;
    this.questionId = questionId;
    this.questionName = questionName;
    this.feedbackId = feedbackId;
  }
}
