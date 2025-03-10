import { Routes } from '@angular/router';
import { GaragesAdminComponent } from './garages-admin/garages-admin.component';
export const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: 'garages-admin',
        component: GaragesAdminComponent,
        data: {
          title: 'garages'
        }
      },

    ]
  }
];
