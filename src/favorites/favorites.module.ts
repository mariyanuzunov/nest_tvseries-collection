import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { UserModule } from 'src/user/user.module';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [UserModule, MoviesModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
