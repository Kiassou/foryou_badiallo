import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Heart {
  left: number;
  delay: number;
  duration: number;
  symbol: string;
}

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.html',
  styleUrl: './message.css'
})
export class Message {

  letterOpened = false;

  hearts: Heart[] = [];


  constructor(
    private router: Router
  ) {

    this.generateHearts();

  }


  // ==========================================
  // OPEN LETTER
  // ==========================================

  openLetter(): void {

    this.letterOpened = true;

  }


  // ==========================================
  // NAVIGATION
  // ==========================================

  goHome(): void {

    this.router.navigate(['/home']);

  }


  goToSurprise(): void {

    this.router.navigate(['/surprise']);

  }


  // ==========================================
  // FLOATING HEARTS
  // ==========================================

  private generateHearts(): void {

    const symbols = [
      '♥',
      '♡',
      '❤',
      '✦',
      '♡'
    ];

    this.hearts = Array.from(
      { length: 22 },
      (_, index) => ({

        left:
          Math.random() * 100,

        delay:
          Math.random() * 8,

        duration:
          7 + Math.random() * 7,

        symbol:
          symbols[index % symbols.length]

      })
    );

  }

}