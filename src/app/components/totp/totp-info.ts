export class TotpInfo {
  email: string;
  active2fa: boolean;

  constructor(email: string, active2fa: boolean) {
    this.email = email;
    this.active2fa = active2fa;
  }
}
