import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../models/hero.model';
import {HeroService} from '../services/hero.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private heroService: HeroService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const id = +params['id'];
      this.heroService.getHero(id)
        .then((hero: Hero) => this.hero = hero);
    });
  }

  goBack(): void {
    window.history.back();
  }

  save(): void {
    this.heroService
      .update(this.hero)
      .then(this.goBack);
  }
}
