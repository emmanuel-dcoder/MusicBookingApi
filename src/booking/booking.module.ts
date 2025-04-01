import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { Event, EventSchema } from 'src/event/schemas/event.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { MailService } from 'src/core/mail/email';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Event.name, schema: EventSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService, MailService],
})
export class BookingModule {}
