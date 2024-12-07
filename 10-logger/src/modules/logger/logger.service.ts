import { Injectable } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import 'winston-daily-rotate-file';

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
      /** new transports.File({ filename: 'logs/info/info.log' }), */
      transports: [
        new transports.DailyRotateFile({
          filename: 'logs/info/info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
          /** zippedArchive: true, Lo que se comprima no se borra */
        }),
      ],
    });

    this.loggerError = createLogger({
      level: 'error',
      format: format.combine(dateFormat, textFormat),
      /** new transports.File({ filename: 'logs/error/error.log' }), */
      transports: [
        new transports.DailyRotateFile({
          filename: 'logs/error/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
          /** zippedArchive: true, Lo que se comprima no se borra */
        }),
      ],
    });

    this.loggerWarn = createLogger({
      level: 'warn',
      format: format.combine(dateFormat, textFormat),
      /** new transports.File({ filename: 'logs/warn/warn.log' }), */
      transports: [
        new transports.DailyRotateFile({
          filename: 'logs/warn/warn-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
          /** zippedArchive: true, Lo que se comprima no se borra */
        }),
      ],
    });

    this.loggerAll = createLogger({
      format: format.combine(dateFormat, textFormat),
      transports: [
        /** new transports.File({ filename: 'logs/all/all.log' }), */
        new transports.DailyRotateFile({
          filename: 'logs/all/all-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
          /** zippedArchive: true, Lo que se comprima no se borra */
        }),
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
