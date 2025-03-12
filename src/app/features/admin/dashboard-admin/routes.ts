import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard-admin.component').then(m => m.DashboardAdminComponent),
    data: {
      title: $localize`dashboardadmin`
    },
    
  }
];

