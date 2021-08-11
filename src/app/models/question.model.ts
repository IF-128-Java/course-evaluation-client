export class Question {
  id: number;
  questionText: string;
  pattern: boolean;

  constructor(id: number , questionText: string, pattern: boolean) {
    this.id = id;
    this.questionText = questionText;
    this.pattern = pattern;
  }


}
