import { Injectable } from '@nestjs/common';
import { MicroserviceConnectionService } from '../microservice-connection/microservice-connection.service';
import { PATTERNS } from './example-communication.constants';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExampleCommunicationService {
  constructor(private microServiceConnection: MicroserviceConnectionService) {}
  sendMessagePattern(message: string) {
    return firstValueFrom(
      this.microServiceConnection
        .getClient()
        .send(PATTERNS.MESSAGES.SEND_MESSAGE, { message }),
    );
  }

  sendEventPattern(message: string) {
    return firstValueFrom(
      this.microServiceConnection
        .getClient()
        .emit(PATTERNS.EVENTS.RECEIVE_MESSAGE, { message }),
    );
  }
}
