import { Module, HttpModule } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {ConfigModule} from '../config/ConfigModule';
import { LoggerModule } from '../log/log.module';


@Module({
  imports: [ConfigModule, HttpModule, LoggerModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
