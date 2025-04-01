import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from 'src/artist/schemas/artist.schema';
import { envConfig } from 'src/core/config/env.config';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Artist.name, schema: ArtistSchema },
      { name: User.name, schema: UserSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: `${envConfig.jwt.secret}`,
      signOptions: { expiresIn: `${envConfig.jwt.expiry}` },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
