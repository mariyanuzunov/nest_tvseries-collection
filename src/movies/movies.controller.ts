import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(':id')
  getOneById(@Param('id') id: string) {
    return this.moviesService.getOneById(id);
  }

  @Get('search/:title')
  search(@Param('title') title: string) {
    return this.moviesService.searchByTitle(title);
  }
}
