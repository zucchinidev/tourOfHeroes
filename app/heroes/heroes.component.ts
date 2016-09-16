import {Component, OnInit} from '@angular/core';
import {Hero} from '../models/hero.model';
import {HeroService} from '../services/hero.service';
import {Router} from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes/heroes.component.html',
  styleUrls: ['app/heroes/heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(private heroService: HeroService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .then((heroes: Hero[]) => this.heroes = heroes);
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  goToDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
