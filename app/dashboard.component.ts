import {Component, OnInit} from '@angular/core';
import {Hero} from './hero.model';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html'
})
export class DashBoardComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) {

  }

  ngOnInit(): void {
    this.heroService
      .getHeroes()
      .then((heroes: Hero[]) => this.heroes = heroes.slice(0, 4));
  }

  goToDetail(): void {
    // TODO
  }
}
