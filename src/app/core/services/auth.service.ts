import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
providedIn: 'root'
})
export class AuthService {

private readonly authKey =
'birthday_authenticated';

constructor(
private router: Router
) {}

// =====================================================
// LOGIN
// =====================================================

login(): void {

sessionStorage.setItem(
  this.authKey,
  'true'
);

}

// =====================================================
// DÉTECTION DE CONNEXION
// =====================================================

isAuthenticated(): boolean {
return sessionStorage.getItem(
  this.authKey
) === 'true';

}

// =====================================================
// DÉCONNEXION
// =====================================================

logout(): void {

sessionStorage.removeItem(
  this.authKey
);

this.router.navigate([
  '/login'
]);

}

}
