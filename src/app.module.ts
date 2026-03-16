import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { SendEmailUseCase } from './application/send-email.usecase';
import { EmailController } from './interface/email.controller';
import { EmailModule } from './interface/email.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'josephinsylvere@gmail.com',
          pass: 'bavx dtop cjoi dnma',
        },
      },
    }),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
