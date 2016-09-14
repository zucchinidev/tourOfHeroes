import {Injectable} from '@angular/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero.model';


@Injectable()
export class HeroService {
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  getHero(id: number): Promise<Hero> {
    return Promise.resolve(HEROES.find((hero: Hero) =>  hero.id === id ));
  }
}
