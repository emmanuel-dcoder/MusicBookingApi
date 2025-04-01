import { IsString, IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    description: 'The ID of the event',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  event: string;

  @ApiProperty({
    description: 'The ID of the user',
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @ApiProperty({ description: 'Number of tickets', example: 2 })
  @IsNumber()
  quantity: number;
}
