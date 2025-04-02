import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from 'src/artist/schemas/artist.schema';
import { comparePassword } from 'src/core/common/utils/utility';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
    userType: 'artist' | 'user',
  ): Promise<any> {
    try {
      if (userType === 'artist') {
        let user = await this.artistModel.findOne({ email });

        if (!user || !(await comparePassword(pass, user.password))) {
          throw new BadRequestException('Invalid email or password');
        }
        const { password, ...result } = user.toObject();
        return { ...result, role: 'artist' };
      }

      if (userType === 'user') {
        let user = await this.userModel.findOne({ email });

        if (!user || !(await comparePassword(pass, user.password))) {
          throw new BadRequestException('Invalid email or password');
        }
        const { password, ...result } = user.toObject();
        return { ...result, role: 'user' };
      }

      return null;
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }

  async login(user: any) {
    try {
      const payload = {
        _id: user._id,
        email: user.email,
        sub: user._id,
        role: user.role,
      };
      return {
        _id: user._id,
        email: user.email,
        role: user.role,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }
}
