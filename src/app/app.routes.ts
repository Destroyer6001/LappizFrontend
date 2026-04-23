import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./Components/home/home').then(m => m.Home), children: [
      {path: 'contacts', loadComponent: () => import('./Components/person-index/person-index').then(m => m.PersonIndex)}
    ]}
];
