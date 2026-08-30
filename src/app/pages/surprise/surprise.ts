import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Star {
left: number;
top: number;
delay: number;
}

interface Particle {
left: number;
delay: number;
duration: number;
symbol: string;
}

@Component({
selector: 'app-surprise',
standalone: true,
imports: [],
templateUrl: './surprise.html',
styleUrl: './surprise.css'
})
export class Surprise {

revealed = false;

giftShaking = false;

stars: Star[] = [];

particles: Particle[] = [];

constructor(
private router: Router
) {

this.generateStars();
this.generateParticles();


}

// ==========================================
// OPEN GIFT
// ==========================================

openGift(): void {

if (this.revealed || this.giftShaking) {
  return;
}

// Commence le tremblement
this.giftShaking = true;

// Petite pause avant la révélation
setTimeout(() => {

  // Révélation
  this.revealed = true;

  // Arrête le tremblement
  this.giftShaking = false;

}, 850);


}

// ==========================================
// CELEBRATION
// ==========================================

private launchCelebration(): void {

// Retour en haut
if (typeof window !== 'undefined') {

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

}

// Confettis
setTimeout(() => {

  this.createConfetti();

}, 150);

}

// ==========================================
// CONFETTI
// ==========================================

private createConfetti(): void {

if (typeof document === 'undefined') {
  return;
}

const symbols = [
  '✦',
  '♥',
  '✧',
  '★',
  '♡'
];

const confettiContainer =
  document.createElement('div');

confettiContainer.className =
  'confetti-container';

document.body.appendChild(
  confettiContainer
);


for (let i = 0; i < 80; i++) {

  const confetti =
    document.createElement('span');

  confetti.className =
    'celebration-confetti';


  // Symbole aléatoire

  confetti.textContent =
    symbols[
      Math.floor(
        Math.random() * symbols.length
      )
    ];


  // Position horizontale

  confetti.style.left =
    `${Math.random() * 100}%`;


  // Décalage vertical aléatoire

  confetti.style.top =
    `${-20 - Math.random() * 80}px`;


  // Taille

  confetti.style.fontSize =
    `${8 + Math.random() * 14}px`;


  // Durée

  confetti.style.animationDuration =
    `${2.5 + Math.random() * 2.5}s`;


  // Délai

  confetti.style.animationDelay =
    `${Math.random() * .8}s`;


  // Mouvement horizontal

  confetti.style.setProperty(
    '--confetti-x',
    `${-100 + Math.random() * 200}px`
  );


  // Rotation

  confetti.style.setProperty(
    '--confetti-rotation',
    `${360 + Math.random() * 720}deg`
  );


  confettiContainer.appendChild(
    confetti
  );

}


// Nettoyage complet

setTimeout(() => {

  confettiContainer.remove();

}, 6500);

}

// ==========================================
// REPLAY
// ==========================================

replay(): void {

this.revealed = false;

this.giftShaking = false;

// Supprime d'éventuels anciens confettis

if (typeof document !== 'undefined') {

  const oldContainer =
    document.querySelector(
      '.confetti-container'
    );

  oldContainer?.remove();

}


if (typeof window !== 'undefined') {

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

}

}

// ==========================================
// NAVIGATION
// ==========================================

goBack(): void {

this.router.navigate([
  '/message'
]);

}

goHome(): void {

this.router.navigate([
  '/home'
]);

}

// ==========================================
// STARS
// ==========================================

private generateStars(): void {
this.stars = Array.from(
  { length: 65 },
  () => ({

    left:
      Math.random() * 100,

    top:
      Math.random() * 100,

    delay:
      Math.random() * 5

  })
);

}

// ==========================================
// PARTICLES
// ==========================================

private generateParticles(): void {
const symbols = [
  '♥',
  '♡',
  '✦',
  '✧',
  '·'
];

this.particles = Array.from(
  { length: 30 },
  (_, index) => ({

    left:
      Math.random() * 100,

    delay:
      Math.random() * 8,

    duration:
      8 + Math.random() * 8,

    symbol:
      symbols[
        index % symbols.length
      ]

  })
);
}

}
