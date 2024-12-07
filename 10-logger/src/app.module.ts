import { Module } from '@nestjs/common';
import { CronModule } from './modules/cron/cron.module';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [LoggerModule, CronModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
