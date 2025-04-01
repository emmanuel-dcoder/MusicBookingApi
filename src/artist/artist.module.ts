import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Artist, ArtistSchema } from './schemas/artist.schema';
import { MailService } from 'src/core/mail/email';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService, MailService],
})
export class ArtistModule {}
