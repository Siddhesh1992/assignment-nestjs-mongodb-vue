import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

export class ClientDto {
  @ApiProperty({ example: 'siddhesh', description: 'This is name of client' })
  @IsString()
  readonly name: string;

  @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
    message: 'Invalid Phone Number',
  })
  @ApiProperty({
    example: '305-555-1345',
    description: 'This is mobile no',
  })
  @IsString()
  readonly phone: string;

  @ApiProperty({
    example: 'test@test.com',
    description: 'This is email account',
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ type: [] })
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  readonly provider: string[];
}
