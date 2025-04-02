import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
  Delete,
  HttpStatus,
} from '@nestjs/common';
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
import { UpdateBookingDto } from './dto/update-booking.dto';
import { successResponse } from 'src/core/config/response';

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
    const data = await this.bookingService.create(createBookingDto);
    return successResponse({
      message: 'Booking created successfully',
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
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
    const data = await this.bookingService.findAll();
    return successResponse({
      message: 'List of bookings',
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  @ApiResponse({ status: 200, description: 'Booking details', type: Booking })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async findOne(@Param('id') id: string) {
    const data = await this.bookingService.fetchOne(id);
    return successResponse({
      message: 'Booking details',
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a booking' })
  @ApiBody({ type: UpdateBookingDto })
  @ApiResponse({
    status: 200,
    description: 'Booking updated successfully',
    type: Booking,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    const data = await this.bookingService.update(id, updateBookingDto);
    return successResponse({
      message: 'Booking updated successfully',
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancel a booking' })
  @ApiResponse({
    status: 200,
    description: 'Booking cancelled successfully',
    type: Booking,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async cancel(@Param('id') id: string) {
    const data = await this.bookingService.cancel(id);
    return successResponse({
      message: 'Booking cancelled successfully',
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }
}
