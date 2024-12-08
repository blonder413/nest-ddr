import { Module } from '@nestjs/common';
import { ExampleCommunicationController } from './example-communication.controller';
import { ExampleCommunicationService } from './example-communication.service';

@Module({
  controllers: [ExampleCommunicationController],
  providers: [ExampleCommunicationService]
})
export class ExampleCommunicationModule {}
