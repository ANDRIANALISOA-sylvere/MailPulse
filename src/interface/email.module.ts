import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendEmailUseCase } from 'src/application/send-email.usecase';
import { EMAIL_REPOSITORY } from 'src/domain/email.repository';
import { EmailOrmEntity } from 'src/infrastructure/persistence/email-orm.entity';
import { PgEmailRepository } from 'src/infrastructure/persistence/pg-email.repository';
import { EmailController } from './email.controller';
import { NodemailerService } from 'src/infrastructure/mailer/nodemailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailOrmEntity])],
  providers: [
    PgEmailRepository,
    SendEmailUseCase,
    NodemailerService,
    {
      provide: EMAIL_REPOSITORY,
      useClass: PgEmailRepository,
    },
  ],
  controllers:[EmailController]
})
export class EmailModule {}
