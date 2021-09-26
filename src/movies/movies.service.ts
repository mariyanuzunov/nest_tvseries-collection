import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { IMovie } from 'src/shared/interfaces/movie.interface';

@Injectable()
export class MoviesService {
  constructor(private http: HttpService) {}

  async getOneById(id: string): Promise<IMovie> {
    const movie$ = this.http.get(`https://api.tvmaze.com/shows/${id}`).pipe(
      map((res) => {
        res.data._id = String(res.data._id);
        return this.extractData(res.data);
      }),
    );
    return await lastValueFrom(movie$);
  }

  async searchByTitle(title: string): Promise<IMovie[]> {
    const movies$ = this.http
      .get(`https://api.tvmaze.com/search/shows?q=${title}`)
      .pipe(
        map((res) => {
          return res.data.map(({ show }) => this.extractData(show));
        }),
      );

    return await lastValueFrom(movies$);
  }

  extractData(item): IMovie {
    function removeHtmlTags(text: string) {
      const regex = new RegExp(/<[^>]*>/, 'gi');
      return text.replace(regex, '');
    }

    return {
      _id: item.id,
      title: item.name,
      genres: item.genres,
      website: item.officialSite,
      imgUrl: item.image?.medium,
      description: removeHtmlTags(
        item.summary || 'There is no description for this TV series.',
      ),
    };
  }
}
