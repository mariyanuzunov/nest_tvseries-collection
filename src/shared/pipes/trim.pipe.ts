import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any) {
    return { movieId: value.movieId.trim(), note: value.note.trim() };
  }
}
