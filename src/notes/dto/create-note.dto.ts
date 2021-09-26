import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Prop movieId is required!' })
  movieId: string;

  @Transform(({ value }) => value.trim())
  note: string;
}
