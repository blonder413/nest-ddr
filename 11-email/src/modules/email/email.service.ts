import { Inject, Injectable } from '@nestjs/common';
import { EmailConfig } from './email-config';

@Injectable()
export class EmailService {
  constructor(@Inject('CONFIG_OPTIONS') private options: EmailConfig) {}
}
