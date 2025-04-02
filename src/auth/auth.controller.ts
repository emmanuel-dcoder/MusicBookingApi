import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { successResponse } from 'src/core/config/response';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //artiste login
  @Post('artist/login')
  @ApiOperation({ summary: 'Artiste Login and get JWT token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: Object,
    example: { access_token: 'jwt.token.here' },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
      'artist',
    );
    const data = await this.authService.login(user);
    return successResponse({
      message: 'Login successful',
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }

  //user login
  @Post('user/login')
  @ApiOperation({ summary: 'User Login and get JWT token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: Object,
    example: { access_token: 'jwt.token.here' },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async userLogin(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
      'user',
    );
    const data = this.authService.login(user);
    return successResponse({
      message: 'Login successful',
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }
}
