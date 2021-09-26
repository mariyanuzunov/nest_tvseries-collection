import { IsNotEmpty, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty({ message: 'movieId field is required!' })
  movieId: string;

  @Min(1, { message: 'the rating must be between 1 and 5' })
  @Max(5, { message: 'the rating must be between 1 and 5' })
  rating: number;
}
