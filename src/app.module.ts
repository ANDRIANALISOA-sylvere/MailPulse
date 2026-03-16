import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './interface/email.module';
import { ConfigModule } from '@nestjs/config';
import { EmailOrmEntity } from './infrastructure/persistence/email-orm.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) ?? 5432,
        username: process.env.DB_USER ?? 'postgres',
        password: process.env.DB_PASSWORD ?? 'postgres',
        database: process.env.DB_NAME ?? 'mailpulse',
        entities: [EmailOrmEntity],
        synchronize: true,
      }),
    }),
    EmailModule,
  ],
})
export class AppModule {}
