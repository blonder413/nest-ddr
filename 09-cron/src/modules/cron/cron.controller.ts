import { Controller, Param, Put } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller('api/v1/cron')
export class CronController {
  constructor(private cronService: CronService) {}

  @Put('/desactivate/:name')
  desactivateCron(@Param('name') name: string) {
    return this.cronService.desactivateCron(name);
  }

  @Put('/activate/:name')
  activateCron(@Param('name') name: string) {
    return this.cronService.activateCron(name);
  }
}
