import { Module } from '@nestjs/common';
import { SimpleLogger } from './logger';

@Module({
  providers: [SimpleLogger],
  exports: [SimpleLogger],
})
export class LoggerModule {}