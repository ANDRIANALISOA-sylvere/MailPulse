export enum EmailStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  SUCCESS = 'success',
  FAILED = 'failed',
}
export class Email {
  private id: string;
  private recipients: string[];
  private subject: string;
  private content: string;
  private status: EmailStatus;
  private erroMessage?: string;
  private sendAt?: Date;
  private createdAt: Date;

  sentSuccessfully(): boolean {
    return this.status === EmailStatus.SUCCESS;
  }

  markAsSucess() {
    this.status = EmailStatus.SUCCESS;
  }

  markAsInProgress() {
    this.status = EmailStatus.IN_PROGRESS;
  }

  markAsFailed() {
    this.status = EmailStatus.FAILED;
  }
}
