import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Hero} from '../models/hero.model';


@Injectable()
export class HeroSearchService {

  private static getSearchUrl(term: string): string {
    return `app/heroes/?name:${term}`;
  }

  constructor(private http: Http) {
  }

  search(term: string): Observable<Hero[]> {
    const searchString = term.toLowerCase();
    return this.http
      .get(HeroSearchService.getSearchUrl(term))
      .map((res: Response) => {
        const heroes: Hero[] = <Hero[]>res.json().data;
        return heroes.filter((item) => item.name.toLowerCase().indexOf(searchString) >= 0);
      });
  }
}
