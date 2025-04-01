import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    try {
      const createdEvent = new this.eventModel(createEventDto);
      return await createdEvent.save();
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }

  async findAll(): Promise<Event[]> {
    try {
      return await this.eventModel
        .find()
        .populate({ path: 'artist', select: '_id name email bio' });
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }

  async findOne(id: string): Promise<Event> {
    try {
      const data = await this.eventModel
        .findById(id)
        .populate({ path: 'artist', select: '_id name email bio' });

      if (!data) throw new BadRequestException('event not found');

      return data;
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }
}
