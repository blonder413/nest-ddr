import { Inject, Injectable } from '@nestjs/common';
import { EmailConfig } from './email-config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(@Inject('CONFIG_OPTIONS') private options: EmailConfig) {}
}
