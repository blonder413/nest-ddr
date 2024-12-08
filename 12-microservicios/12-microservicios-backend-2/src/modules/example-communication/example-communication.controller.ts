import { Controller, Get } from '@nestjs/common';
import { ExampleCommunicationService } from './example-communication.service';

@Controller('api/v1/microservice-b2')
export class ExampleCommunicationController {
  constructor(
    private exampleCommunicationService: ExampleCommunicationService,
  ) {}

  @Get('send-message')
  sendMessage() {
    return this.exampleCommunicationService.sendMessage('Hola 2');
  }
}
