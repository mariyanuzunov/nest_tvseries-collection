import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MoviesService } from 'src/movies/movies.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService,
    private moviesService: MoviesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserRating(@Req() req, @Param('id') movieId: string) {
    const record = await this.ratingsService.getUserRating(
      req.user._id,
      movieId,
    );

    return { rating: record?.rating };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUserRating(@Req() req, @Body() data: CreateRatingDto) {
    try {
      await this.moviesService.getOneById(data.movieId);
    } catch (error) {
      console.error(error);
      throw new NotFoundException('TV Series Not Found');
    }

    return this.ratingsService.createUserRating(
      req.user._id,
      data.movieId,
      data.rating,
    );
  }
}
