import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './schemas/artist.schema';
import { MailService } from 'src/core/mail/email';
import { hashPassword } from 'src/core/common/utils/utility';
import { UpdateArtisteDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    private readonly mailService: MailService,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const { password, email } = createArtistDto;
    try {
      const validateArtist = await this.artistModel.findOne({ email });
      if (validateArtist) throw new BadRequestException('Artist already exist');

      const hashedPassword = await hashPassword(password);

      const createdArtist = await this.artistModel.create({
        ...createArtistDto,
        password: hashedPassword,
      });

      try {
        await this.mailService.sendMailNotification(
          email,
          'Welcome',
          { name: createdArtist.name },
          'welcome',
        );
      } catch (error) {
        console.log('email notification error:', error);
      }

      createdArtist.password = undefined;

      return createdArtist;
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }

  async findAll(): Promise<Artist[]> {
    try {
      return await this.artistModel.find({}, { password: 0 });
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }

  async findOne(id: string): Promise<Artist> {
    try {
      const data = await this.artistModel.findOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { password: 0 },
      );

      if (!data) throw new BadRequestException('event not found');
      return data;
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }

  async update(
    id: string,
    updateArtistDto: Pick<UpdateArtisteDto, 'name' | 'bio'>,
  ): Promise<Artist> {
    try {
      const artist = await this.artistModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(id),
        },
        { ...updateArtistDto },
        { new: true, runValidators: true },
      );
      if (!artist) throw new BadRequestException('Unable to update artist');

      artist.password = undefined;
      return artist;
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }
}
