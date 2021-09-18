export class FeedbackCount {
  studentId: string;
  total: string;

  constructor(studentId: string, total: string) {
    this.studentId = studentId;
    this.total = total;
  }
}
