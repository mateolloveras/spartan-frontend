import { Routes } from '@angular/router';

export const CLIENT_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.ClientDashboardComponent)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
