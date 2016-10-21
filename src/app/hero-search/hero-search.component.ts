import {Component, OnInit} from '@angular/core';
import {HeroSearchService} from '../services/hero-search.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {Hero} from '../models/hero.model';


@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;

  // Subject es un productor de un flujo de eventos observables,
  // en este caso produce un observable de strings que son los
  // criterios de búsquedea que utilizaremos como filtro
  private searchTerms = new Subject<string>();

  private static getObservableOfEmptyHero() {
    return Observable.of<Hero[]>([]);
  }


  constructor(private heroSearchService: HeroSearchService,
              private router: Router) {

  }

  /**
   * @summary:
   * .debounceTime(300): esperar 300ms por cada event del stream, por cada término inyectado,
   *                      así no saturamos al servidor con muchas peticiones
   * .distinctUntilChanged(): ignorar si el siguiente término es el mismo que el previo
   * .switchMap(): llamada a nuestro servicio por cada término después del filtrado
   *                realizado con los dos métodos anteriores, además cancela o descarta
   *                búsquedas previas, retornando solamente el último.
   *                Retorna un array de observables de tipo Hero
   *                o un observable de array heroes vacío si no encuentra el término.
   */
  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term) => {
        return term
          ? this.heroSearchService.search(term)
          : HeroSearchComponent.getObservableOfEmptyHero();
      })
      .catch(error => {
        console.log(error);
        return HeroSearchComponent.getObservableOfEmptyHero();
      });
  }

  // Introducir el término en el stream observable
  search(term: string): void {
    this.searchTerms.next(term);
  }

  goToDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
