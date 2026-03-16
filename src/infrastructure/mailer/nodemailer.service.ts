import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

export interface EmailInput {
  recipients: string[];
  subject: string;
  content: string;
}

@Injectable()
export class NodemailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: EmailInput): Promise<void> {
    await this.mailerService.sendMail({
      to: email.recipients,
      from: process.env.SMTP_USER,
      subject: email.subject,
      html: email.content,
    });
    console.log(`Emails sent to: ${email.recipients.join(', ')}`);
  }
}
