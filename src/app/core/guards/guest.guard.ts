import { inject } from '@angular/core';
import {
CanActivateFn,
Router
} from '@angular/router';

import { AuthService }
from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {

const authService =
inject(AuthService);

const router =
inject(Router);

// Déjà connectée ?

if (authService.isAuthenticated()) {

return router.createUrlTree([
  '/home'
]);

}

// Pas connectée → login autorisé

return true;

};
