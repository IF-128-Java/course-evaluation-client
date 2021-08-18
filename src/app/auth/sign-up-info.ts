export class SignUpInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string[];


  constructor(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.role = ['ROLE_STUDENT'];
  }
}
