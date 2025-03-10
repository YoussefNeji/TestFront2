import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-dashboard' }
  },
  {
    name: 'History',
    url: '/history',
    iconComponent: { name: 'cil-history' }
  },
  {
    name: 'Vehicle',
    url: '/vehicle',
    iconComponent: { name: 'cilCarAlt' }
  },
  {
    name: 'Notifications',
    url: '/notifications',
    iconComponent: { name: 'cil-bell' }
  },
  {
    name: 'Profile',
    url: '/profilepage',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Garages',
    url: '/garages',
    iconComponent: { name: 'cil-garage' }
  }
];
