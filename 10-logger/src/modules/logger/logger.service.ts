import { Injectable } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable()
export class LoggerService {
  private loggerInfo: Logger;
  private loggerError: Logger;
  private loggerWarn: Logger;
  private loggerAll: Logger;

  constructor() {
    this.createLoggers();
  }

  createLoggers() {
    const textFormat = format.printf((log) => {
      return `${log.timestamp} - [${log.level.toLocaleUpperCase().charAt(0)}] ${log.message}`;
    });

    const dateFormat = format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });

    this.loggerInfo = createLogger({
      level: 'info',
      format: format.combine(dateFormat, textFormat),
      transports: [new transports.File({ filename: 'logs/info/info.log' })],
    });

    this.loggerError = createLogger({
      level: 'error',
      format: format.combine(dateFormat, textFormat),
      transports: [new transports.File({ filename: 'logs/error/error.log' })],
    });

    this.loggerWarn = createLogger({
      level: 'warn',
      format: format.combine(dateFormat, textFormat),
      transports: [new transports.File({ filename: 'logs/warn/warn.log' })],
    });

    this.loggerAll = createLogger({
      format: format.combine(dateFormat, textFormat),
      transports: [
        new transports.File({ filename: 'logs/all/all.log' }),
        new transports.Console(),
      ],
    });
  }

  debug(message: string) {}
  error(message: string) {
    this.loggerAll.error(message);
    this.loggerError.error(message);
  }
  log(message: string) {
    this.loggerAll.info(message);
    this.loggerInfo.info(message);
  }
  verbose(message: string) {}
  warn(message: string) {
    this.loggerAll.warn(message);
    this.loggerWarn.warn(message);
  }
}
