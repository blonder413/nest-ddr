import { Injectable } from '@nestjs/common';
import { MicroserviceConnectionService } from '../microservice-connection/microservice-connection.service';
import { PATTERNS } from './example-communication.constants';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExampleCommunicationService {
  constructor(private microServiceConnection: MicroserviceConnectionService) {}
  async sendMessagePattern(message: string) {
    try {
      await this.microServiceConnection.connectClient();
      return firstValueFrom(
        this.microServiceConnection
          .getClient()
          .send(PATTERNS.MESSAGES.SEND_MESSAGE, { message }),
      );
    } catch (error) {
      console.error('No hay conexión');
      return false;
    }
  }

  async sendEventPattern(message: string) {
    try {
      await this.microServiceConnection.connectClient();
      return firstValueFrom(
        this.microServiceConnection
          .getClient()
          .emit(PATTERNS.EVENTS.RECEIVE_MESSAGE, { message }),
      );
    } catch (error) {
      console.error('No hay conexión');
      return false;
    }
  }
}
