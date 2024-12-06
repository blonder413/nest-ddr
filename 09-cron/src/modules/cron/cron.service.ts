import { ConflictException, Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class CronService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron('*/10 * * * * *', { name: 'cron1' })
  cron1() {
    console.log('Cron1: se ejecuta cada 10 segundos');
  }

  @Cron('*/30 * * * * *', { name: 'cron2' })
  cron2() {
    console.log('Cron2: se ejecuta cada 30 segundos');
  }

  @Cron('* * * * *', { name: 'cron3' })
  cron3() {
    console.log('Cron3: se ejecuta cada minuto');
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
}
