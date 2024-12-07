import { Inject, Injectable } from '@nestjs/common';
import { EmailConfig } from './email-config';
import * as nodemailer from 'nodemailer';
import { MessageDto } from './dto/message-dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    @Inject('CONFIG_OPTIONS') private options: EmailConfig,
    private configService: ConfigService,
  ) {
    /** console.log(this.configService.get('config.from')); */
    /** console.log(this.options); */
  }

  sendEmail(message: MessageDto) {
    try {
      const transporter = nodemailer.createTransport({
        service: this.options.service,
        auth: {
          user: this.options.from,
          pass: this.options.password,
        },
      });

      const to = message.receivers.map((e) => e.email);

      const mailOptions = {
        from: this.options.from,
        to,
        subject: message.subject,
        html: message.body,
      };
      return transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
