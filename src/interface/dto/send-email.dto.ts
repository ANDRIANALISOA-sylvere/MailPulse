import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class SendEmailDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  recipients: string[];

  @IsString()
  subject: string;

  @IsString()
  content: string;
}
