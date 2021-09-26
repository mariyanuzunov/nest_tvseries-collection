import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating, RatingDocument } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Rating.name) private ratingModel: Model<RatingDocument>,
  ) {}

  async getUserRating(userId: string, movieId: string) {
    return this.ratingModel.findOne({ $and: [{ userId, movieId }] }).exec();
  }

  async createUserRating(userId: string, movieId: string, rating: number) {
    const filter = { $and: [{ userId, movieId }] };
    const update = { rating };
    const options = {
      new: true,
      upsert: true,
    };

    return this.ratingModel.findOneAndUpdate(filter, update, options).exec();
  }
}
