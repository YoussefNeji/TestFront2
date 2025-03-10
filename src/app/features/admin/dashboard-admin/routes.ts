import { Routes } from '@angular/router';
import '@angular/localize/init';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard-admin.component').then(m => m.DashboardAdminComponent),
    data: {
      title: $localize`dashboardadmin`
    },
    
  }
];

