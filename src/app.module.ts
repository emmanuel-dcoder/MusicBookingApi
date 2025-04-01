import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ArtistModule } from './artist/artist.module';
import { envConfig } from './core/config/env.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(envConfig.database.mongo_url),
    ArtistModule,
    EventModule,
    BookingModule,
    AuthModule,
    UserModule,
    JwtModule.register({
      secret: `${envConfig.jwt.secret}`,
      signOptions: { expiresIn: `${envConfig.jwt.expiry}` },
    }),
    UserModule,
  ],
})
export class AppModule {}
