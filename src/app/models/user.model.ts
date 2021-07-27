export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];


  constructor(firstName: string, lastName: string, email: string, password: string, roles: string[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}
