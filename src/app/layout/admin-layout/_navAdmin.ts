import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard-admin',
    iconComponent: { name: 'cil-dashboard-admin' }
  },
  {
    name: 'Garages',
    url: '/dashboard-admin/garages-admin',
    iconComponent: { name: 'cil-garage-admin' }
  }
];
