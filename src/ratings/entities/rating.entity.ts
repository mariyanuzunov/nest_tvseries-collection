import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RatingDocument = Document & Rating;

@Schema({ timestamps: true })
export class Rating {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  movieId: number;

  @Prop({ required: true })
  rating: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
