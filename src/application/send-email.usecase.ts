import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Email, EmailStatus } from 'src/domain/email.entity';
import {
  EMAIL_REPOSITORY,
  type EmailRepository,
} from 'src/domain/email.repository';
import { NodemailerService } from 'src/infrastructure/mailer/nodemailer.service';

interface EmailInput {
  recipients: string[];
  subject: string;
  content: string;
}

@Injectable()
export class SendEmailUseCase {
  constructor(
    @Inject(EMAIL_REPOSITORY)
    private readonly emailRepo: EmailRepository,
    private readonly nodemailerService: NodemailerService,
  ) {}

  async execute(input: EmailInput) {
    const email = new Email();
    email.id = randomUUID();
    email.recipients = input.recipients;
    email.subject = input.subject;
    email.content = input.content;
    email.createdAt = new Date();
    email.status = EmailStatus.PENDING;

    await this.emailRepo.save(email);

    try {
      await this.nodemailerService.sendEmail(input);
      email.markAsSuccess();
      await this.emailRepo.save(email);
    } catch (error: any) {
      console.error(error.message);
      email.markAsFailed(error.message);
      await this.emailRepo.save(email);
    }
  }
}
