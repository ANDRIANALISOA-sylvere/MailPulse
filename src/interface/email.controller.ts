import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailUseCase } from 'src/application/send-email.usecase';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('emails')
export class EmailController {
  constructor(private readonly sendEmailUseCase: SendEmailUseCase) {}

  @Post('send')
  async sendEmail(@Body() dto: SendEmailDto) {
    return await this.sendEmailUseCase.execute(dto);
  }
}
