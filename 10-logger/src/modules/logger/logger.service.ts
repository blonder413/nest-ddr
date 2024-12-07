import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private loggerInfo: Logger;
  private loggerError: Logger;
  private loggerWarn: Logger;
  private loggerAll: Logger;

  constructor() {}

  createLogger() {}
}
