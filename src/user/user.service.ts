import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CredentialsDto } from 'src/auth/dto/credentials-dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userData: CredentialsDto) {
    const exists = await this.getUserByUsername(userData.username);

    if (exists) {
      throw new BadRequestException(
        'A user with this username already exists.',
      );
    }

    const user = new this.userModel(userData);
    return await user.save();
  }

  async getUserByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async getUserById(id: string) {
    return this.userModel.findById(id).exec();
  }
}
