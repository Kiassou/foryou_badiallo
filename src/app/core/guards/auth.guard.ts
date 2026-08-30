import { inject } from '@angular/core';
import {
CanActivateFn,
Router
} from '@angular/router';

import { AuthService }
from '../services/auth.service';

export const authGuard: CanActivateFn = () => {

const authService =
inject(AuthService);

const router =
inject(Router);

// =====================================================
// VÉRIFICATION
// =====================================================

if (authService.isAuthenticated()) {


// Connectée → accès autorisé

return true;


}

// =====================================================
// NON CONNECTÉE
// =====================================================

// Bloque la page et retourne au login

return router.createUrlTree([
'/login'
]);

};
