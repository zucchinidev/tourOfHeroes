import {Injectable} from '@angular/core';
import {Hero} from '../models/hero.model';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';

@Injectable()
export class HeroService {
  private heroesUrl: string = 'app/heroes';

  private static getJSONHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json'
    });
  }

  private static handleError(error: any): Promise<any> {
    console.error('Error: ', error); // TODO only useful in the early stages of development. Change for system logs
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) {

  }

  getHeroes(): Promise<Hero[]> {
    // TODO adjust data property to match my web api
    return this.get(this.heroesUrl)
      .toPromise()
      .then((response) => response.json().data as Hero[])
      .catch(HeroService.handleError);
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then((heroes) => heroes.find((hero: Hero) => hero.id === id));
  }

  update(hero: Hero): Promise<Hero> {
    const url = this.getUrlForSingleResource(hero);
    return this.put(url, hero)
      .toPromise()
      .then(() => hero)
      .catch(HeroService.handleError);
  }

  create(name: string): Promise<Hero> {
    const hero = new Hero(name);
    return this.post(hero)
      .toPromise()
      .then((response) => response.json().data as Hero)
      .catch(HeroService.handleError);
  }

  remove(hero: Hero): Promise<void> {
    return this.delete(hero)
      .toPromise()
      .then(() => undefined)
      .catch(HeroService.handleError);
  }

  private get(url: string): Observable<Response> {
    return this.http.get(url);
  }

  private put(url: string, hero: Hero): Observable<Response> {
    return this.http.put(url, JSON.stringify(hero), HeroService.getJSONHeaders());
  }

  private post(hero: Hero): Observable<Response> {
    return this.http
      .post(this.heroesUrl, JSON.stringify(hero), HeroService.getJSONHeaders());
  }


  private delete(hero: Hero): Observable<Response> {
    return this.http
      .delete(this.getUrlForSingleResource(hero), HeroService.getJSONHeaders());
  }

  private getUrlForSingleResource(hero: Hero) {
    return `${this.heroesUrl}/${hero.id}`;
  }
}
