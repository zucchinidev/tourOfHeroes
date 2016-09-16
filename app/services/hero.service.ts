import {Injectable} from '@angular/core';
import {Hero} from './hero.model';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';

@Injectable()
export class HeroService {
  private heroesUrl: string = 'app/heroes';
  constructor(private http: Http) {

  }

  getHeroes(): Promise<Hero[]> {
    // TODO adjust data property to match my web api
    return this.get(this.heroesUrl)
      .toPromise()
      .then((response) => response.json().data as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then((heroes) => heroes.find((hero: Hero) =>  hero.id === id ));
  }

  private get(url: string): Observable<Response> {
    return this.http.get(url);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error: ', error); // TODO only useful in the early stages of development. Change for system logs
    return Promise.reject(error.message || error);
  }

}
