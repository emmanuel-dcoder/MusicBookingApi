import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: 'The title of the event',
    example: 'Summer Concert',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The date of the event',
    example: '2025-06-01T19:00:00Z',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'The location of the event',
    example: 'Central Park',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'The ID of the artist performing',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  artist: string;

  @ApiProperty({ description: 'Price per ticket', example: 50 })
  @IsNumber()
  ticketPrice: number;
}
