import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Star {
  left: number;
  top: number;
  delay: number;
}

interface Moment {
  id: number;
  day: string;
  month: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  image?: string;
}

@Component({
  selector: 'app-moments',
  standalone: true,
  imports: [],
  templateUrl: './moments.html',
  styleUrl: './moments.css'
})
export class Moments {

  stars: Star[] = [];

  selectedMoment: Moment | null = null;


  /*
   * ==========================================
   * TIMELINE
   * ==========================================
   *
   * Les dates sont volontairement génériques
   * pour le moment.
   *
   * On pourra les remplacer avec vos vrais
   * moments et vraies dates.
   */

  moments: Moment[] = [

    {
      id: 1,

      day: '01',

      month: 'JAN',

      title:
        'Un nouveau chapitre',

      category:
        'COMMENCEMENT',

      description:
        'Chaque belle histoire commence quelque part. Et parfois, le plus beau reste encore à écrire.',

      icon:
        'auto_stories',

      image:
        'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=85'
    },


    {
      id: 2,

      day: '14',

      month: 'FÉV',

      title:
        'Un moment inoubliable',

      category:
        'SOUVENIR',

      description:
        'Un de ces moments simples qui deviennent précieux quand on y repense.',

      icon:
        'favorite',

      image:
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85'
    },


    {
      id: 3,

      day: '08',

      month: 'MAR',

      title:
        'Un grand sourire',

      category:
        'BONHEUR',

      description:
        "Parce qu'un sourire peut parfois changer toute une journée.",

      icon:
        'sentiment_satisfied',

      image:
        'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=85'
    },


    {
      id: 4,

      day: '21',

      month: 'AVR',

      title:
        'Une journée spéciale',

      category:
        'MOMENT',

      description:
        'Une journée qui méritait une petite place dans cette histoire.',

      icon:
        'sunny',

      image:
        'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=900&q=85'
    },


    {
      id: 5,

      day: '12',

      month: 'JUIN',

      title:
        'Encore un souvenir',

      category:
        'MÉMOIRE',

      description:
        'Le temps passe, mais certains moments restent exactement là où on les a laissés.',

      icon:
        'photo_camera',

      image:
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85'
    },


    {
      id: 6,

      day: '30',

      month: 'AOÛT',

      title:
        'La veille du grand jour',

      category:
        'COUNTDOWN',

      description:
        'Une dernière journée avant de célébrer une personne vraiment spéciale.',

      icon:
        'celebration',

      image:
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85'
    },


    {
      id: 7,

      day: '31',

      month: 'AOÛT',

      title:
        'Le jour de Badiallo',

      category:
        'BIRTHDAY',

      description:
        "Aujourd'hui, on célèbre une personne unique. Joyeux anniversaire Badiallo. 🎂❤️",

      icon:
        'cake',

      image:
        'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=900&q=85'
    }

  ];


  constructor(
    private router: Router
  ) {

    this.generateStars();

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
  // MODAL
  // ==========================================

  openMoment(moment: Moment): void {

    this.selectedMoment = moment;

    document.body.style.overflow = 'hidden';

  }


  closeMoment(): void {

    this.selectedMoment = null;

    document.body.style.overflow = '';

  }


  // ==========================================
  // STARS
  // ==========================================

  private generateStars(): void {

    this.stars = Array.from(
      { length: 60 },
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

}