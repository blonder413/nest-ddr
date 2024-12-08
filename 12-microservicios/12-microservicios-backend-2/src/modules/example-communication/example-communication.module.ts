import { Module } from '@nestjs/common';
import { ExampleCommunicationController } from './example-communication.controller';
import { ExampleCommunicationService } from './example-communication.service';
import { MicroserviceConnectionModule } from '../microservice-connection/microservice-connection.module';

@Module({
  controllers: [ExampleCommunicationController],
  imports: [MicroserviceConnectionModule],
  providers: [ExampleCommunicationService],
})
export class ExampleCommunicationModule {}
