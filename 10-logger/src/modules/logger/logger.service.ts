import { Injectable } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable()
export class LoggerService {
  private loggerInfo: Logger;
  private loggerError: Logger;
  private loggerWarn: Logger;
  private loggerAll: Logger;

  constructor() {}

  createLogger() {
    const textFormat = format.printf((log) => {
      return `${log.timestamp} - [${log.level.toLocaleUpperCase().charAt(0)}] ${log.message}`;
    });

    const dateFormat = format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });

    this.loggerInfo = createLogger({
      level: 'info',
      format: format.combine(dateFormat, textFormat),
      transports: [new transports.File({ filename: 'log/info/info.log' })],
    });

    this.loggerError = createLogger({
      level: 'error',
      format: format.combine(dateFormat, textFormat),
      transports: [new transports.File({ filename: 'log/error/error.log' })],
    });

    this.loggerWarn = createLogger({
      level: 'warn',
      format: format.combine(dateFormat, textFormat),
      transports: [new transports.File({ filename: 'log/warn/warn.log' })],
    });

    this.loggerAll = createLogger({
      format: format.combine(dateFormat, textFormat),
      transports: [
        new transports.File({ filename: 'log/all/all.log' }),
        new transports.Console(),
      ],
    });
  }
}
