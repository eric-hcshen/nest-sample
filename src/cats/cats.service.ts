import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { SimpleLogger, AppLogger } from '../log/logger';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  private logger: AppLogger = new AppLogger(CatsService.name);
  constructor( private readonly simpleLogger: SimpleLogger) {
    this.simpleLogger.setContext('CatService');
  }

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    this.simpleLogger.warn('About to return cats!');
    this.logger.log('new application logger');
    return this.cats;
  }
}
