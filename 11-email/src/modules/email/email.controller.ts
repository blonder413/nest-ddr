import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';

@Controller('api/v1/email')
@ApiTags('Emails')
export class EmailController {
  constructor(private emailService: EmailService) {}
}
