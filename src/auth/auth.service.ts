import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserDocument } from 'src/user/entities/user.entity';
import { CredentialsDto } from './dto/credentials-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserDocument) {
    const payload = { username: user.username, sub: user._id };
    return { userId: user._id, accessToken: this.jwtService.sign(payload) };
  }

  async register(userData: CredentialsDto) {
    try {
      userData.password = await bcrypt.hash(userData.password, 10);
      return await this.userService.create(userData);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async validateUser(
    credentials: CredentialsDto,
  ): Promise<UserDocument | null> {
    try {
      const user: UserDocument = await this.userService.getUserByUsername(
        credentials.username,
      );

      const isValid = await bcrypt.compare(credentials.password, user.password);

      if (user && isValid) {
        return user;
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Invalid username or password.');
    }

    return null;
  }
}
