import {
  Controller,
  Request,
  Post,
  UseGuards,
  ValidationPipe,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { CredentialsDto } from './auth/dto/credentials-dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
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
}
