import { Email, EmailStatus } from '../../domain/email.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('emails')
export class EmailOrmEntity extends Email {
  @PrimaryGeneratedColumn('uuid')
  declare id: string;

  @Column({ type: 'text', array: true })
  declare recipients: string[];

  @Column()
  declare subject: string;

  @Column({ type: 'text' })
  declare content: string;

  @Column({ type: 'enum', enum: EmailStatus, default: EmailStatus.PENDING })
  declare status: EmailStatus;

  @Column({ default: 0 })
  declare retryCount: number;

  @Column({ nullable: true })
  declare errorMessage?: string;

  @Column({ nullable: true })
  declare sentAt: Date;

  @CreateDateColumn()
  declare createdAt: Date;
}
