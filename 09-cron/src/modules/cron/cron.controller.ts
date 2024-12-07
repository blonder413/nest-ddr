import { Controller, Get, Param, Put } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller('api/v1/cron')
export class CronController {
  constructor(private cronService: CronService) {}

  @Get()
  getNamesCrons() {
    return this.cronService.getNamesCrones();
  }

  @Put('/desactivate/:name')
  desactivateCron(@Param('name') name: string) {
    return this.cronService.desactivateCron(name);
  }

  @Put('/activate/:name')
  activateCron(@Param('name') name: string) {
    return this.cronService.activateCron(name);
  }

  @Put('/activate-all')
  activateAll() {
    return this.cronService.activateAll();
  }

  @Put('/desactivate-all')
  desactivateAll() {
    return this.cronService.desactivateAll();
  }
}
