import { Inject, Injectable } from '@nestjs/common';
import { EmailConfig } from './email-config';
import * as nodemailer from 'nodemailer';
import { MessageDto } from './dto/message-dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(@Inject('CONFIG_OPTIONS') private options: EmailConfig, private configService:ConfigService) {
    /** console.log(this.configService.get('config.from')); */
    /** console.log(this.options); */
    
  }

  sendEmail(message: MessageDto) {}
}
