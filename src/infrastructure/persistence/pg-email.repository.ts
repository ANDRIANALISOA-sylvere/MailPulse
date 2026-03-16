import { InjectRepository } from '@nestjs/typeorm';
import { EmailRepository } from 'src/domain/email.repository';
import { EmailOrmEntity } from './email-orm.entity';
import { Repository } from 'typeorm';
import { Email } from 'src/domain/email.entity';

export class PgEmailRepository implements EmailRepository {
  constructor(
    @InjectRepository(EmailOrmEntity)
    private readonly emailOrmRepo: Repository<EmailOrmEntity>,
  ) {}

  async findById(id: string): Promise<Email | null> {
    return await this.emailOrmRepo.findOne({
      where: {
        id,
      },
    });
  }

  async save(email: Email): Promise<void> {
    await this.emailOrmRepo.save(email);
  }
}
