import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { EventPage } from './components/event-page/event-page';

export const routes: Routes = [
  {
    path: '',
    component: Main,
  },
  {
    path: 'event-page/:id',
    loadComponent: () => import('./components/event-page/event-page').then((m) => m.EventPage),
  },
];
