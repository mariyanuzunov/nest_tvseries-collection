import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    try {
      return await this.authService.login(req.user);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Post('/register')
  async register(@Body(ValidationPipe) userData: CredentialsDto) {
    try {
      return await this.authService.register(userData);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile/:id')
  async profile(@Param('id') userId: string, @Req() req) {
    try {
      if (req.user._id != userId) {
        throw new Error(
          "Viewing another person's profile is not implemented yet",
        );
      }
      return await this.authService.getProfile(userId);
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error.message);
    }
  }
}
