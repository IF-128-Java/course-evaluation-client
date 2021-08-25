export class ResetPasswordInfo {
  password: string;
  confirmPassword: string;
  token: string;

  constructor(password: string, confirmPassword: string, token: string) {
    this.password = password;
    this.token = token;
    this.confirmPassword = confirmPassword;
  }
}
