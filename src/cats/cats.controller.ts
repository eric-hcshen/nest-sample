import { Body, Controller, Get, Put, Param, Post, Query, UseGuards, HttpService } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { ListAllEntities } from './dto/listAllEntities'
import { Cat } from './interfaces/cat.interface';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';
import { PostDesc } from './dto/post';
import { tap } from 'rxjs/operators';

//@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService) {}

  @Post()
  //@Roles('admin')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get('/query')
  async findPosts(@Query('posts') query: string) {
    let x = await this.httpService.get<PostDesc[]>('https://jsonplaceholder.typicode.com/posts?' + query).toPromise();
    return x.data.map( x => { console.log(x); return x.id;});
    /* can's resolve converting circular structure to JSON
    .pipe(
      tap(x => console.log(x))
    );*/
  }
  /*
  findAllbyLimit(@Query() query:ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }*/

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    return ':id call beack';
  }

  @Get('key/:key')
  findValue(
    @Param('key') key: string): string {
      return this.configService.get(key);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: CreateCatDto) {
    return `This action updates a #${id} cat`;
  }
  

  
}
