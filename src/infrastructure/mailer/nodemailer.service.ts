import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface EmailInput {
  recipients: string[];
  subject: string;
  content: string;
}

@Injectable()
export class NodemailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: EmailInput) {
    try {
      await this.mailerService.sendMail({
        to: email.recipients.join(', '),
        from: 'josephinsylvere@gmail.com',
        subject: email.subject,
        html: email.content,
      });
      console.log(`Emails sent to: ${email.recipients.join(', ')}`);
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  }
}
