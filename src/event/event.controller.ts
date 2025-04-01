import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Event } from './schemas/event.schema';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('events')
@Controller('api/v1/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new event' })
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({
    status: 201,
    description: 'Event created successfully',
    type: Event,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'List of events', type: [Event] })
  async findAll() {
    return await this.eventService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by ID' })
  @ApiResponse({ status: 200, description: 'Event details', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async findOne(@Param('id') id: string) {
    return await this.eventService.findOne(id);
  }
}
