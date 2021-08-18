export class User {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];


  constructor(firstName: string, lastName: string, email: string, roles: string[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.roles = roles;
  }
}
