import {Component, OnInit} from '@angular/core';
import {Hero} from './hero.model';
import {HeroService} from './hero.service';
import {Router} from '@angular/router';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashBoardComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService,
  private router: Router) {

  }

  ngOnInit(): void {
    this.heroService
      .getHeroes()
      .then((heroes: Hero[]) => this.heroes = heroes.slice(0, 4));
  }

  goToDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
