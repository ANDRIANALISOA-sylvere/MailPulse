export enum EmailStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  SUCCESS = 'success',
  FAILED = 'failed',
}
export class Email {
  id: string;
  recipients: string[];
  subject: string;
  content: string;
  status: EmailStatus;
  errorMessage?: string;
  retryCount: number;
  sentAt?: Date;
  createdAt: Date;

  sentSuccessfully(): boolean {
    return this.status === EmailStatus.SUCCESS;
  }

  markAsSuccess() {
    this.status = EmailStatus.SUCCESS;
    this.sentAt = new Date();
  }

  markAsInProgress() {
    this.status = EmailStatus.IN_PROGRESS;
  }

  markAsFailed(errorMessage: string) {
    this.status = EmailStatus.FAILED;
    this.errorMessage = errorMessage;
    this.retryCount += 1;
  }

  canRetry(maxRetries: number = 3): boolean {
    return this.retryCount < maxRetries;
  }
}
