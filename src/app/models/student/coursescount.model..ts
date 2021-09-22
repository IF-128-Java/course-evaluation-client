export class coursescountModel {
  id: string;
  totalCourses: string;
  email: string

  constructor(id: string, totalCourses: string, email: string) {
    this.id = id;
    this.totalCourses = totalCourses;
    this.email = email;
  }
}
