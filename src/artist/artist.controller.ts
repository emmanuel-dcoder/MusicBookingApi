import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Artist } from './schemas/artist.schema';
import { successResponse } from 'src/core/config/response';

@ApiTags('artists')
@Controller('api/v1/artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiBody({ type: CreateArtistDto })
  @ApiResponse({
    status: 201,
    description: 'Artist created successfully',
    type: Artist,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createArtistDto: CreateArtistDto) {
    const data = await this.artistService.create(createArtistDto);
    return successResponse({
      message: 'Artist created successfully',
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, description: 'List of artists', type: [Artist] })
  async findAll() {
    const data = await this.artistService.findAll();
    return successResponse({
      message: 'List of artists',
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an artist by ID' })
  @ApiResponse({ status: 200, description: 'Artist details', type: Artist })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  async findOne(@Param('id') id: string) {
    const data = await this.artistService.findOne(id);
    return successResponse({
      message: 'Artist details',
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }
}
