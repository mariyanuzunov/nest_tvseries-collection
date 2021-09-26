import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addOne(@Req() req, @Body() createFavoriteDto: CreateFavoriteDto) {
    const userId = req.user._id;
    const { itemId } = createFavoriteDto;
    return this.favoritesService.addToFavorites(userId, itemId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Req() req) {
    return this.favoritesService.getUserFavorites(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') itemId: string, @Req() req) {
    return this.favoritesService.deleteFromFavorites(req.user._id, itemId);
  }
}
