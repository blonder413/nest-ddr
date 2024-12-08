import { Controller, Get } from '@nestjs/common';
import { ExampleCommunicationService } from './example-communication.service';
import { MessagePattern } from '@nestjs/microservices';
import { PATTERNS } from './example-communication.constants';

@Controller('api/v1/microservice-b1')
export class ExampleCommunicationController {
  constructor(
    private exampleCommunicationService: ExampleCommunicationService,
  ) {}

  @Get('send-message')
  sendMessage() {
    return this.exampleCommunicationService.sendMessagePattern('Hola 1');
  }

  @MessagePattern(PATTERNS.MESSAGES.SEND_MESSAGE)
  receiveMessageFromMessagePattern1(data: { message: string }) {
    console.log(`[MessagePattern] mensaje recibido: ${data.message}`);
    return true;
  }
}
