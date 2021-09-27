import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserDocument } from 'src/user/entities/user.entity';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserDocument) {
    const { _id, username } = user;
    return this.composeRespone(_id, username);
  }

  async register(userData: CredentialsDto) {
    try {
      userData.password = await bcrypt.hash(userData.password, 10);
      const { _id, username } = await this.userService.createUser(userData);
      return this.composeRespone(_id, username);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async getProfile(userId: string) {
    const { _id, username } = await this.userService.getUserById(userId);
    return this.composeRespone(_id, username);
  }

  async validateUser(
    credentials: CredentialsDto,
  ): Promise<UserDocument | null> {
    try {
      const user: UserDocument = await this.userService.getUserByUsername(
        credentials.username,
      );

      const isValid = await bcrypt.compare(credentials.password, user.password);

      if (!user || !isValid) {
        throw new Error();
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Invalid username or password.');
    }

    return null;
  }

  composeRespone(_id: string, username: string) {
    const payload = { username, sub: _id };
    return {
      user: {
        _id,
        username,
      },
      token: this.jwtService.sign(payload),
    };
  }
}
