import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CredentialsDto } from 'src/auth/dto/credentials-dto';
import { IMovie } from 'src/shared/interfaces/movie.interface';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: CredentialsDto) {
    const exists = await this.getUserByUsername(userData.username);

    if (exists) {
      throw new BadRequestException(
        'A user with this username already exists.',
      );
    }

    const user = new this.userModel(userData);
    await user.save();
    return { username: user.username };
  }

  async getUserByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async getUserById(id: string) {
    return this.userModel.findById(id, { password: 0 }).exec();
  }

  async addToFavorites(userId: string, movie: IMovie) {
    try {
      const user = await this.userModel.findById(userId);
      user.favorites.push(movie);
      return await user.save();
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async getUserFavorites(userId: string) {
    try {
      const user = await this.userModel.findById(userId);
      return user.favorites;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async removeFromFavorites(userId: string, movieId: number) {
    try {
      const user = await this.userModel.findById(userId);
      user.favorites = user.favorites.filter((f) => f._id !== movieId);
      await user.save();
      return user.favorites;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
