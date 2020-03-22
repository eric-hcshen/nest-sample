import { Logger, Injectable, Scope } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });
//import { config } from '../config';
import * as path from 'path';


@Injectable({ scope: Scope.TRANSIENT })
//@Injectable()
export class SimpleLogger extends Logger {

}

export class AppLogger implements LoggerService {
  private logger: winston.Logger;
  constructor(name?: string) {
    this.initializeLogger(name);
  }
  initializeLogger(name?: string) {
    this.logger = winston.createLogger({
      //level: config.logger.level,
      format: combine(
        label({ 
            label: name 
        }),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
        myFormat
      ),
      transports: [
        new winston.transports.File({ dirname: path.join(__dirname, './../log/debug/'), filename: 'debug.log', level: 'debug' }),
        new winston.transports.File({ dirname: path.join(__dirname, './../log/error/'), filename: 'error.log', level: 'error' }),
        new winston.transports.File({ dirname: path.join(__dirname, './../log/info/'), filename: 'info.log', level: 'info' })
      ],
    });
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      );
    }
  }
  error(message: string, trace: string) {
    this.logger.log("error", message);
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.log("warn", message);
    //this.logger.warn('warn', message);
  }

  log(message: string) {
    this.logger.log("info", message);
    // this.logger.log('info', message);
  }
}