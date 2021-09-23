export class coursescountModel {
  id: string;
  totalCourses: string;
  email: string
  totalGroups: string

  constructor(id: string, totalCourses: string, email: string, totalGroups: string ) {
    this.id = id;
    this.totalCourses = totalCourses;
    this.email = email;
    this.totalGroups = totalGroups;
  }
}
