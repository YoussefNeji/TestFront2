import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthGuard } from '../guards/auth.guard';
import { AdminLayoutComponent } from './layout/admin-layout';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/pages/landing-page/landing-page.component').then(m => m.LandingPageComponent),
    data: {
      title: 'Landing Page'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },

  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'services',
    loadComponent: () => import('./views/pages/services/services.component').then(m => m.ServicesComponent),
    data: {
      title: 'Services'
    }
  },
  {
    path: 'pricing',
    loadComponent: () => import('./views/pages/pricing/pricing.component').then(m => m.PricingComponent),
    data: {
      title: 'Pricing'
    }
  },
  {
    path: 'garages',
    loadComponent: () => import('./views/pages/garages/garages.component').then(m => m.GaragesComponent),
    data: {
      title: 'Garages'
    }
  },
  {
    path: 'auth-redirect',
    loadComponent: () => import('./services/Auth-redirect/Auth-redirect.component').then(m => m.AuthRedirectComponent),
    data: {
      title: 'Auth-redirect'
    }
  },
  {
    path: 'forget-pass',
    loadComponent: () => import('./views/pages/forget-pass/forget-pass.component').then(m => m.ForgetPassComponent),
    data: {
      title: 'forget-pass'
    }
  },
  {
    path: 'features',
    loadComponent: () => import('./views/pages/features/features.component').then(m => m.FeaturesComponent),
    data: {
      title: 'Features'
    }
  },
  {
    path: 'forget-pass',
    loadComponent: () => import('./views/pages/forget-pass/forget-pass.component').then(m => m.ForgetPassComponent),
    data: {
      title: 'forget-pass'
    }
  },
  {
    path: 'about-us',
    loadComponent: () => import('./views/pages/about-us/about-us.component').then(m => m.AboutUsComponent),
    data: {
      title: 'About-us'
    }
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./views/pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
    data: {
      title: 'Privacy-policy'
    }
  },
  {
    path: 'user-profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/user-profile/user-profile.component').then(m => m.UserProfileComponent),

    data: {
      title: 'User-profile'
    }
  },
  {
    path: 'add-car',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/user/add-car/add-car.component').then(m => m.AddCarComponent),

    data: {
      title: 'add-car'
    }
  },
  {
    path: 'car-view/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/user/car-view/car-view.component').then(m => m.CarViewComponent),

    data: {
      title: 'car-view'
    }
  },
  {
    path: 'edit-car/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/user/edit-car/edit-car.component').then(m => m.EditCarComponent),

    data: {
      title: 'Edit Car'
    }
  },
  {
    path: 'LoginAdmin',
    loadComponent: () => import('./views/pages/admin-login/admin-login.component').then(m => m.AdminLoginComponent),
    data: {
      title: 'Login Admin'
    }
  },
  {
    path: 'premium',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/user/premium/premium.component').then(m => m.PremiumComponent),

    data: {
      title: 'premium'
    }
  },
  {
    path: 'payment',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/premium/payment/payment.component').then(m => m.PaymentComponent),

    data: {
      title: 'Payment'
    }
  },
  {
    path: 'premium-success',
    loadComponent: () => import('./features/premium/premium-success/premium-success.component').then(m => m.PremiumSuccessComponent),
    data: {
      title: 'premium-success'
    }
  },

  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        component: DefaultLayoutComponent,
        data: {
          title: 'Home'
        },
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
          },

          {
            path: '',
            loadChildren: () => import('./features/user/user.routes').then((m) => m.routes)
          },
          {
            path: 'theme',
            loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
          },
          {
            path: 'base',
            loadChildren: () => import('./views/base/routes').then((m) => m.routes)
          },
          {
            path: 'buttons',
            loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
          },
          {
            path: 'forms',
            loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
          },
          {
            path: 'icons',
            loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
          },
          {
            path: 'notifications',
            loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
          },
          {
            path: 'widgets',
            loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
          },
          {
            path: 'charts',
            loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
          },
          {
            path: 'pages',
            loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
          }
        ]
      },
      {
        path: 'dashboard-admin',
        component: AdminLayoutComponent,
        data: {
          title: 'Admin Panel'
        },
        children: [
          {
            path: '',
            redirectTo: 'dashboard-admin',
            pathMatch: 'full'
          },
          {
            path: 'dashboard-admin',
            loadChildren: () => import('./features/admin/dashboard-admin/routes').then((m) => m.routes)
          },
          {
            path: '',
            loadChildren: () => import('./features/admin/admin.routes').then((m) => m.routes)
          },
          {
            path: 'theme',
            loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
          },
          {
            path: 'base',
            loadChildren: () => import('./views/base/routes').then((m) => m.routes)
          },
          {
            path: 'buttons',
            loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
          },
          {
            path: 'forms',
            loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
          },
          {
            path: 'icons',
            loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
          },
          {
            path: 'notifications',
            loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
          },
          {
            path: 'widgets',
            loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
          },
          {
            path: 'charts',
            loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
          },
          {
            path: 'pages',
            loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
          }
        ]
      },
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  { path: '**', redirectTo: '' }
];
