import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating, RatingDocument } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Rating.name) private ratingModel: Model<RatingDocument>,
  ) {}

  async addRating(userId: string, movieId: number, rating: number) {
    const rec = new this.ratingModel({ userId, movieId, rating });
    return await rec.save();
  }

  async removeRating(ratingId: string) {
    return await this.ratingModel.findByIdAndDelete(ratingId).exec();
  }
}
