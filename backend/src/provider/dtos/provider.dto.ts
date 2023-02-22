import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProviderDto {
  @ApiProperty({ example: 'siddhesh', description: 'This is name of provider' })
  @IsString()
  readonly name: string;
}
