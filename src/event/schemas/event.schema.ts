import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  location: string;

  @Prop({ type: Types.ObjectId, ref: 'Artist', required: true })
  artist: Types.ObjectId;

  @Prop({ required: true })
  ticketPrice: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
