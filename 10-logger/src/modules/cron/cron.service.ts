import { ConflictException, Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class CronService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private loggerService: LoggerService,
  ) {}

  @Cron('*/10 * * * * *', { name: 'cron1' })
  cron1() {
    /** this.loggerService.log('Cron1: se ejecuta cada 10 segundos'); */
    console.log('Cron1: se ejecuta cada 10 segundo');
  }

  @Cron('*/30 * * * * *', { name: 'cron2' })
  cron2() {
    this.loggerService.warn('Cron2: se ejecuta cada 30 segundos');
  }

  @Cron('* * * * *', { name: 'cron3' })
  cron3() {
    this.loggerService.error('Cron3: se ejecuta cada minuto');
  }

  desactivateCron(name: string) {
    const job: CronJob = this.schedulerRegistry.getCronJob(name);
    if (!job) {
      throw new ConflictException('El cron no existe');
    }
    job.stop();
    console.log(`Cron ${name} desactivado`);
    return true;
  }

  activateCron(name: string) {
    const job: CronJob = this.schedulerRegistry.getCronJob(name);
    if (!job) {
      throw new ConflictException('El cron no existe');
    }
    job.start();
    console.log(`Cron ${name} activado`);
    return true;
  }

  getNamesCrones() {
    const names = [];
    for (const nameCron of this.schedulerRegistry.getCronJobs().keys()) {
      names.push(nameCron);
    }
    return names;
  }

  activateAll() {
    const names = this.getNamesCrones();
    for (const name of names) {
      this.activateCron(name);
    }
    return true;
  }

  desactivateAll() {
    const names = this.getNamesCrones();
    for (const name of names) {
      this.desactivateCron(name);
    }
    return true;
  }
}
