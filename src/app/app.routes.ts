import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { WorkoutSessionForm } from './pages/workout-session-form/workout-session-form';
import { WorkoutSessionList } from './pages/workout-session-list/workout-session-list';
import { isAuthenticatedGuard } from './guards/is-authenticated-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'sessions', component: WorkoutSessionList },
      { path: 'sessions/new', component: WorkoutSessionForm },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
