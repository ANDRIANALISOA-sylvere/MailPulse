import { Email } from './email.entity';

export interface EmailRepository {
  findById(id: string): Promise<Email | null>;
  save(email: Email): Promise<void>;
}

export const EMAIL_REPOSITORY = Symbol('EMAIL_REPOSITORY');
