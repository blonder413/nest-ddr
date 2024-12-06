import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronModule } from './modules/cron/cron.module';

@Module({
  imports: [CronModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
