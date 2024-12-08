import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleCommunicationService {
  constructor() {}
  sendMessage(message: string) {
    return message;
  }
}
