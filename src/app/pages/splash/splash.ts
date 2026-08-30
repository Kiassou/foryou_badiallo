import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-splash',
  standalone: true,
  imports: [],
  templateUrl: './splash.html',
  styleUrl: './splash.css'
})
export class Splash {

  stars: Star[] = [];
  hearts: Heart[] = [];

  constructor(
    private router: Router
  ) {
    this.generateStars();
    this.generateHearts();
  }

  private generateStars(): void {

    this.stars = Array.from({ length: 80 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 4
    }));

  }

  private generateHearts(): void {

    this.hearts = Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 7
    }));

  }

  enter(): void {

    // Petite pause pour laisser l'animation
    // du bouton se jouer avant la navigation.

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 350);

  }

}