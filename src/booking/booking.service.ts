import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './schemas/booking.schema';
import { Event } from 'src/event/schemas/event.schema';
import { MailService } from 'src/core/mail/email';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailService: MailService,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const event = await this.eventModel.findOne({
      _id: new mongoose.Types.ObjectId(createBookingDto.event),
    });
    if (!event) throw new BadRequestException('Invalid event id');

    const totalPrice = event.ticketPrice * createBookingDto.quantity;
    const booking = await this.bookingModel.create({
      ...createBookingDto,
      totalPrice,
    });

    try {
      const { user } = createBookingDto;
      const fetchUser = await this.userModel.findOne({
        _id: new mongoose.Types.ObjectId(user),
      });
      await this.mailService.sendMailNotification(
        fetchUser.email,
        'Booking',
        { name: fetchUser.name, event: event.title },
        'booking',
      );
    } catch (error) {
      console.log('email notification error:', error);
    }
    return booking;
  }

  async findAll(): Promise<Booking[]> {
    try {
      return await this.bookingModel
        .find()
        .populate({ path: 'event' })
        .populate({ path: 'user', select: '-password' });
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }

  async fetchOne(id: string): Promise<Booking> {
    try {
      const data = await this.bookingModel
        .findOne({ _id: new mongoose.Types.ObjectId(id) })
        .populate({ path: 'event' })
        .populate({ path: 'user', select: '-password' });

      if (!data) throw new BadGatewayException('booking not found');
      return data;
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }
}
