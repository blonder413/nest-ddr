import { DynamicModule, Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { EmailConfig } from './email-config';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  exports:[EmailService]
})
export class EmailModule {
  static register(options: EmailConfig): DynamicModule {
    return {
      controllers: [EmailController],
      module: EmailModule,
      providers: [
        { provide: 'CONFIG_OPTIONS', useValue: options },
        EmailService,
      ],
      exports:[EmailService]
    };
  }
}
