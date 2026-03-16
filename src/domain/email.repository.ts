import { Email } from './email.entity';

export interface EmailRepository {
  findById(id: string): Promise<Email>;
  getStatus(id: string): Promise<Email>;
  save(email: Email): Promise<void>;
}
