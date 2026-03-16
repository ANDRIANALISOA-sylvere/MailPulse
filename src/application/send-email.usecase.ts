import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Email, EmailStatus } from 'src/domain/email.entity';
import {
  EMAIL_REPOSITORY,
  type EmailRepository,
} from 'src/domain/email.repository';
import { NodemailerService } from 'src/infrastructure/mailer/nodemailer.service';

export interface EmailInput {
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

  async execute(input: EmailInput): Promise<{ id: string; status: string }> {
    const email = new Email();
    email.id = randomUUID();
    email.recipients = input.recipients;
    email.subject = input.subject;
    email.content = input.content;
    email.status = EmailStatus.PENDING;
    email.retryCount = 0;
    email.createdAt = new Date();

    await this.emailRepo.save(email);

    try {
      email.markAsInProgress();
      await this.emailRepo.save(email);

      await this.nodemailerService.sendEmail(input);

      email.markAsSuccess();
      await this.emailRepo.save(email);
    } catch (error: any) {
      email.markAsFailed(error.message);
      await this.emailRepo.save(email);
    }

    return {
      id: email.id,
      status: email.status,
    };
  }
}
