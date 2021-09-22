import { Injectable } from '@nestjs/common';
import { MoviesService } from 'src/movies/movies.service';
import { UserService } from 'src/user/user.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    private userService: UserService,
    private movieService: MoviesService,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    const { userId, movieId } = createFavoriteDto;
    const movie = await this.movieService.getOneById(movieId);
    return this.userService.addToFavorites(userId, movie);
  }

  findAll(userId: string) {
    return this.userService.getUserFavorites(userId);
  }

  remove(userId: string, movieId: string) {
    return this.userService.removeFromFavorites(userId, Number(movieId));
  }
}
