import {
  Body,
  Controller,
  Delete,
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
  @Post()
  async create(@Req() req, @Body() data: CreateRatingDto) {
    try {
      await this.moviesService.getOneById(data.movieId.toString());
    } catch (error) {
      console.error(error);
      throw new NotFoundException();
    }

    return this.ratingsService.addRating(
      req.user._id,
      data.movieId,
      data.rating,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingsService.removeRating(id);
  }
}
