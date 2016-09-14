import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


import {AppComponent}  from './app.component';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroesComponent} from './heroes.component';
import {HeroService} from './hero.service';
import {DashBoardComponent} from './dashboard.component';
import {routing} from './app.routing';
import {InMemoryWebApiModule} from 'angular2-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    routing
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashBoardComponent
  ],
  providers: [
    HeroService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
