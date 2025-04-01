import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Booking extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  event: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ default: 'pending', enum: ['pending', 'confirmed', 'cancelled'] })
  status: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
