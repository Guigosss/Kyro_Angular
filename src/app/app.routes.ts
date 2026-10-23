import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { WorkoutSessionForm } from './pages/workout-session-form/workout-session-form';
import { WorkoutSessionList } from './pages/workout-session-list/workout-session-list';
import { isAuthenticatedGuard } from './guards/is-authenticated-guard';
import { WorkoutSessionDetail } from './pages/workout-session-detail/workout-session-detail';
import { isAdminGuard } from './guards/is-admin-guard';
import { ExerciseList } from './pages/exercise-list/exercise-list';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'sessions', component: WorkoutSessionList },
      { path: 'sessions/new', component: WorkoutSessionForm },
      { path: 'session/:id', component: WorkoutSessionDetail },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    canActivate: [isAdminGuard],
    children: [
      { path: 'exercises', component: ExerciseList },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
