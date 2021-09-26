import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MoviesService } from 'src/movies/movies.service';
import { Favorite, FavoriteDocument } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoritesModel: Model<FavoriteDocument>,
    private movieService: MoviesService,
  ) {}

  async addToFavorites(userId: string, itemId: string) {
    const item = await this.movieService.getOneById(itemId);
    const record = await this.favoritesModel.findOne({ userId }).exec();

    if (record) {
      if (!record.favorites.find((x) => x._id == itemId)) {
        record.favorites.push(item);
        await record.save();
      }
    } else {
      const newRecord = new this.favoritesModel({ userId, favorites: [item] });
      await newRecord.save();
    }

    return item;
  }

  async getUserFavorites(userId: string) {
    const record = await this.favoritesModel.findOne({ userId }).exec();
    return record.favorites;
  }

  async deleteFromFavorites(userId: string, itemId: string) {
    const record = await this.favoritesModel
      .findOne({
        userId,
      })
      .exec();

    if (record) {
      const i = record.favorites.findIndex((x) => x._id == itemId);
      if (i != -1) {
        const deletedItem = record.favorites.splice(i, 1)[0];
        await record.save();
        return deletedItem;
      }
    }

    throw new NotFoundException();
  }
}
