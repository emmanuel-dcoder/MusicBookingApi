import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './schemas/event.schema';
import { UpdateEventDto } from './dto/update-event.dto';

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

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    try {
      const event = await this.eventModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { ...updateEventDto },
        { new: true, runValidators: true },
      );

      if (!event) throw new BadRequestException('Unable to update event');

      return event;
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const event = await this.eventModel.findByIdAndDelete(id);
      if (!event) throw new BadRequestException('Unable to delete event');
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }
}
