export class SignUpInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string[];


  constructor(firstName: string, lastName: string, email: string, password: string, passwordMatches: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.confirmPassword = passwordMatches;
    this.role = ['ROLE_STUDENT'];
  }
}
