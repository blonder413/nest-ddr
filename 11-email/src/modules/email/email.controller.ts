import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { MessageDto } from './dto/message-dto';

@Controller('api/v1/email')
@ApiTags('Emails')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('send-email')
  sendEmail(@Body() message: MessageDto) {
    return this.emailService.sendEmail(message);
  }
}
