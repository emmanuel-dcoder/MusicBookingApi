import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Booking } from './schemas/booking.schema';

@ApiTags('bookings')
@ApiBearerAuth()
@Controller('api/v1/bookings')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBody({ type: CreateBookingDto })
  @ApiResponse({
    status: 201,
    description: 'Booking created successfully',
    type: Booking,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingService.create(createBookingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({
    status: 200,
    description: 'List of bookings',
    type: [Booking],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() {
    return await this.bookingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  @ApiResponse({ status: 200, description: 'Booking details', type: Booking })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async findOne(@Param('id') id: string) {
    const data = await this.bookingService.fetchOne(id);
    return data;
  }
}
