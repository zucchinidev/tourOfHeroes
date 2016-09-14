import {Routes, RouterModule} from '@angular/router';
import {HeroesComponent} from './heroes.component';
import {ModuleWithProviders} from '@angular/core';
import {DashBoardComponent} from './dashboard.component';
import {HeroDetailComponent} from './hero-detail.component';


const appRoutes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'dashboard',
    component: DashBoardComponent
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
