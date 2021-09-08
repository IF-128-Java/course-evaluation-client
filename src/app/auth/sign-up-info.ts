export class SignUpInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string[];
  active_2fa: boolean = false;


  constructor(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, active_2fa: boolean) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.role = ['ROLE_STUDENT'];
    this.active_2fa = active_2fa;
  }
}
