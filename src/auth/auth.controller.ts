import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

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
    return await this.authService.login(user);
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
    return this.authService.login(user);
  }
}
