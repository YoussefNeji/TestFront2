import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: 'profilepage',
        component: ProfileComponent,
        data: {
          title: 'User Profile'
        }
      },
      {
        path: 'vehicle',
        component: VehiclesComponent,
        data: {
          title: 'Vehicle'
        }
      },

    ]
  }
];
