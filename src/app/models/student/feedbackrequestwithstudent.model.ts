

export class Feedbackrequestwithstudent {
  id: number;
  feedbackDescription: string;
  startDate: string;
  endDate: string;
  course: number;
  studentId: number

  constructor(id: number, feedbackDescription: string, startDate: string, endDate: string, course: number, studentId: number) {
    this.id = id;
    this.feedbackDescription = feedbackDescription;
    this.startDate = startDate;
    this.endDate = endDate;
    this.course = course;
    this.studentId = studentId;
  }
}
