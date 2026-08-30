import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

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

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  stars: Star[] = [];

  hearts: Heart[] = [];

  menuOpen = false;

  currentYear = new Date().getFullYear();

  countdown: Countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  private countdownInterval: ReturnType<typeof setInterval> | null = null;

  // =====================================================
  // DATE ANNIVERSAIRE
  // =====================================================

  private getBirthdayDate(): Date {
    const now = new Date();

    return new Date(
      now.getFullYear(),
      7,
      31,
      0,
      0,
      0
    );
  }

  constructor(
    private router: Router,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  // =====================================================
  // INITIALISATION
  // =====================================================

  ngOnInit(): void {

    // -----------------------------------------------
    // Détection de session
    // -----------------------------------------------

    if (
      !this.authService.isAuthenticated()
    ) {
      this.router.navigate([
        '/login'
      ]);

      return;
    }

    // -----------------------------------------------
    // Animations
    // -----------------------------------------------

    this.generateStars();
    this.generateStars();

    // -----------------------------------------------
    // Countdown
    // -----------------------------------------------

    this.startCountdown();
  }

  // =====================================================
  // MENU
  // =====================================================

  toggleMenu(): void {
    this.menuOpen =
      !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  // =====================================================
  // NAVIGATION
  // =====================================================

  goTo(route: string): void {
    this.closeMenu();

    this.router.navigate([
      route
    ]);
  }

  goToSurprise(): void {
    this.closeMenu();

    this.router.navigate([
      '/surprise'
    ]);
  }

  // =====================================================
  // DÉCONNEXION
  // =====================================================

  logout(): void {
    this.stopCountdown();
    this.closeMenu();
    this.authService.logout();
  }

  // =====================================================
  // SCROLL
  // =====================================================

  scrollToMemories(): void {
    document
      .getElementById('memories')
      ?.scrollIntoView({
        behavior: 'smooth'
      });
  }

  // =====================================================
  // COUNTDOWN
  // =====================================================

  private startCountdown(): void {
    // Première mise à jour immédiate
    this.updateCountdown();

    // Évite de créer plusieurs intervalles
    this.stopCountdown();

    this.countdownInterval =
      setInterval(() => {

        /*
         * Si la session disparaît,
         * on déconnecte automatiquement.
         */

        if (
          !this.authService
            .isAuthenticated()
        ) {
          this.stopCountdown();

          this.router.navigate([
            '/login'
          ]);

          return;
        }

        this.updateCountdown();

      }, 1000);
  }

  // =====================================================
  // UPDATE COUNTDOWN
  // =====================================================

  private updateCountdown(): void {

    const now = new Date();

    let target =
      this.getBirthdayDate();

    /*
     * Si le 31 août de cette année
     * est déjà passé, on prend
     * le 31 août de l'année prochaine.
     */

    if (
      target.getTime() <=
      now.getTime()
    ) {
      target = new Date(
        now.getFullYear() + 1,
        7,
        31,
        0,
        0,
        0
      );
    }

    const difference =
      target.getTime() -
      now.getTime();

    const totalSeconds =
      Math.max(
        0,
        Math.floor(
          difference / 1000
        )
      );

    this.countdown.days =
      Math.floor(
        totalSeconds / 86400
      );

    this.countdown.hours =
      Math.floor(
        (totalSeconds % 86400) /
        3600
      );

    this.countdown.minutes =
      Math.floor(
        (totalSeconds % 3600) /
        60
      );

    this.countdown.seconds =
      totalSeconds % 60;

    this.cdr.markForCheck();
  }

  // =====================================================
  // STOP COUNTDOWN
  // =====================================================

  private stopCountdown(): void {
    if (
      this.countdownInterval !== null
    ) {
      clearInterval(
        this.countdownInterval
      );

      this.countdownInterval =
        null;
    }
  }

  // =====================================================
  // STARS
  // =====================================================

  private generateStars(): void {
    this.stars =
      Array.from(
        { length: 90 },
        () => ({

          left:
            Math.random() * 100,

          top:
            Math.random() * 100,

          delay:
            Math.random() * 6,

          duration:
            2 + Math.random() * 5

        })
      );
  }

  // =====================================================
  // HEARTS
  // =====================================================

  private generateHearts(): void {
    this.hearts =
      Array.from(
        { length: 18 },
        () => ({

          left:
            Math.random() * 100,

          delay:
            Math.random() * 10,

          duration:
            7 + Math.random() * 8

        })
      );
  }

  // =====================================================
  // CLEANUP
  // =====================================================

  ngOnDestroy(): void {
    this.stopCountdown();
  }
}