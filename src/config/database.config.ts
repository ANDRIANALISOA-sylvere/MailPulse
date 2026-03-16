import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EmailOrmEntity } from 'src/infrastructure/persistence/email-orm.entity';
require('dotenv').config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'root',
  password: 'sily*',
  database: 'mailpulse',
  entities: [EmailOrmEntity],
  synchronize: true,
};
