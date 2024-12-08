import { Module } from '@nestjs/common';
import { MicroserviceConnectionService } from './microservice-connection.service';

@Module({
  exports: [MicroserviceConnectionService],
  providers: [MicroserviceConnectionService],
})
export class MicroserviceConnectionModule {}
