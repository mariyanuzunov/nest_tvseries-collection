import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IMovie } from 'src/shared/interfaces/movie.interface';

export type FavoriteDocument = Document & Favorite;

@Schema({ timestamps: true })
export class Favorite {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  favorites: IMovie[];
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
