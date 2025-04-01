import { PartialType } from '@nestjs/swagger';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtisteDto extends PartialType(CreateArtistDto) {}
