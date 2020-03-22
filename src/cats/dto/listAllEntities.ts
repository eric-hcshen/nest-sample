import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListAllEntities {

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  readonly limit: number;
  
  @ApiProperty({
    type: Number,
  })
  @IsInt()
  readonly page: number;
}