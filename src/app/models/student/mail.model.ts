export class Mail {
  to: string;
  subject: string;
  message: string;

  constructor(to: string, subject: string, message: string) {
    this.to = to;
    this.subject = subject;
    this.message = message;
  }
}
