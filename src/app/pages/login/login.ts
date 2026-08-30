import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface Star {
  left: number;
  top: number;
  delay: number;
  duration: number;
}

interface Heart {
  left: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';

  showPassword = false;
  isLoading = false;

  errorMessage = '';

  stars: Star[] = [];
  hearts: Heart[] = [];

  private errorTimeout: ReturnType<typeof setTimeout> | null = null;

  // =====================================================
  // IDENTIFIANTS
  // =====================================================

  private readonly validUsername = 'badiallo';
  private readonly validPassword = '3108026';

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.generateStars();
    this.generateHearts();

    // ===================================================
    // DÉTECTION SI DÉJÀ CONNECTÉE
    // ===================================================

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  // =====================================================
  // BACK
  // =====================================================

  goBack(): void {
    this.router.navigate(['/splash']);
  }

  // =====================================================
  // PASSWORD
  // =====================================================

  togglePassword(): void {
    this.showPassword =
      !this.showPassword;
  }

  // =====================================================
  // ERROR
  // =====================================================

  private showError(message: string): void {
    this.errorMessage = message;

    if (this.errorTimeout !== null) {
      clearTimeout(this.errorTimeout);
    }

    this.errorTimeout = setTimeout(() => {
      this.errorMessage = '';
      this.cdr.detectChanges();
    }, 3000);

    this.cdr.detectChanges();
  }

  // =====================================================
  // LOGIN
  // =====================================================

  login(): void {
    this.errorMessage = '';

    const username =
      this.username
        .trim()
        .toLowerCase();

    const password =
      this.password.trim();

    // ===================================================
    // CHAMPS VIDES
    // ===================================================

    if (!username || !password) {
      this.showError(
        'Entre les deux petits secrets pour continuer ❤️'
      );
      return;
    }

    // ===================================================
    // VÉRIFICATION
    // ===================================================

    if (
      username !== this.validUsername ||
      password !== this.validPassword
    ) {
      this.showError(
        'Hmm... ce ne sont pas les bons secrets 👀'
      );
      return;
    }

    // ===================================================
    // CHARGEMENT
    // ===================================================

    this.isLoading = true;

    setTimeout(() => {
      // Enregistre la connexion
      this.authService.login();

      // Accueil
      this.router.navigate(['/home']);
    }, 900);
  }

  // =====================================================
  // STARS
  // =====================================================

  private generateStars(): void {
    this.stars = Array.from(
      { length: 65 },
      () => ({
        left:
          Math.random() * 100,

        top:
          Math.random() * 100,

        delay:
          Math.random() * 5,

        duration:
          2 + Math.random() * 4
      })
    );
  }

  // =====================================================
  // HEARTS
  // =====================================================

  private generateHearts(): void {
    this.hearts = Array.from(
      { length: 12 },
      () => ({
        left:
          Math.random() * 100,

        delay:
          Math.random() * 8,

        duration:
          7 + Math.random() * 6
      })
    );
  }
}