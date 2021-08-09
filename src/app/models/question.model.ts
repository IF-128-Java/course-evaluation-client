export class Question {
  id?: number;
  questionText: string;
  isPattern?: boolean;

  constructor(id: number, questionText: string, isPattern: boolean) {
    this.id = id;
    this.questionText = questionText;
    this.isPattern = isPattern;
  }


}
