import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { SwaggerModule} from '@nestjs/swagger';
import {ConfigModule} from './config/ConfigModule';
import {LoggerModule} from './log/log.module'

@Module({
  imports: [LoggerModule, ConfigModule, CoreModule, SwaggerModule, CatsModule]
})
export class AppModule {}
