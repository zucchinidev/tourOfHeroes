import {Routes, RouterModule} from '@angular/router';
import {HeroesComponent} from './heroes.component';
import {ModuleWithProviders} from '@angular/core';


const appRoutes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent
  }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
