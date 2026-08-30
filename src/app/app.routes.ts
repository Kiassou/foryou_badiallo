import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },

  {
    path: '',
    loadComponent: () =>
      import('./pages/splash/splash')
        .then(m => m.Splash)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login')
        .then(m => m.Login)
  },

  // ==========================================
  // PAGES PROTÉGÉES
  // ==========================================

  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home')
        .then(m => m.Home)
  },

  {
    path: 'souvenirs',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/souvenirs/souvenirs')
        .then(m => m.Souvenirs)
  },

  {
    path: 'moments',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/moments/moments')
        .then(m => m.Moments)
  },

  {
    path: 'message',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/message/message')
        .then(m => m.Message)
  },

  {
    path: 'surprise',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/surprise/surprise')
        .then(m => m.Surprise)
  },

  {
    path: '**',
    redirectTo: 'splash'
  }

];