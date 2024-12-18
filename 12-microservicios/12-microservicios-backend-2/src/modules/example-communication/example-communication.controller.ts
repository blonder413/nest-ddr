import { Controller, Get } from '@nestjs/common';
import { ExampleCommunicationService } from './example-communication.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { PATTERNS } from './example-communication.constants';

@Controller('api/v1/microservice-b2')
export class ExampleCommunicationController {
  constructor(
    private exampleCommunicationService: ExampleCommunicationService,
  ) {}

  @Get('send-message')
  sendMessage() {
    return this.exampleCommunicationService.sendMessagePattern(
      'Hola desde backend 2',
    );
  }

  @MessagePattern(PATTERNS.MESSAGES.SEND_MESSAGE)
  receiveMessageFromMessagePatternB2(data: { message: string }) {
    console.log(`[MessagePattern] mensaje recibido: ${data.message}`);
    this.exampleCommunicationService.sendEventPattern(
      'Mensaje de vuelta desde el backend 2',
    );
    return true;
  }

  @EventPattern(PATTERNS.EVENTS.RECEIVE_MESSAGE)
  receiveMessageFromEventB1(data: { message: string }) {
    console.log(`[EventPattern] mensaje recibido: ${data.message}`);
  }
}
