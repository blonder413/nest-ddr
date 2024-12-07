import { Module } from '@nestjs/common';
import { EmailModule } from './modules/email/email.module';
import { SERVICES } from './modules/email/email-config';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [configuration],
    }),
    EmailModule.register({
      from: process.env.EMAIL_FROM,
      password: process.env.EMAIL_PASSWORD,
      service: SERVICES.GMAIL,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
