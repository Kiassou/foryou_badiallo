import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Star {
  left: number;
  top: number;
  delay: number;
  duration: number;
}

interface Memory {
  id: number;
  image: string;
  title: string;
  date: string;
  description: string;
  rotation: number;
  featured?: boolean;
}

@Component({
  selector: 'app-souvenirs',
  standalone: true,
  imports: [],
  templateUrl: './souvenirs.html',
  styleUrl: './souvenirs.css'
})
export class Souvenirs {

  stars: Star[] = [];

  selectedMemory: Memory | null = null;


  /*
   * ==========================================
   * SOUVENIRS
   * ==========================================
   *
   * Pour le moment nous utilisons des images
   * temporaires.
   *
   * Plus tard nous pourrons mettre les vraies
   * photos de Badiallo.
   */

  memories: Memory[] = [

    {
      id: 1,
      image: 'assets/images/badiallo1.png',
      title:'Un joli souvenir',
      date:'Un moment précieux',
      description:'Parce que certains sourires restent gravés bien plus longtemps que prévu.',
      rotation: -2,
      featured: true
    },


    {
      id: 2,
      image: 'assets/images/badiallo2.png',
      title:'Un sourire',
      date:'Un instant simple',
      description:'Les meilleurs souvenirs sont parfois les plus simples.',
      rotation: 1.5
    },


    {
      id: 3,

      image:
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85',

      title:
        'Une belle journée',

      date:
        'Un jour à retenir',

      description:
        'Une journée comme une petite parenthèse dans le temps.',

      rotation:
        -1
    },


    {
      id: 4,

      image:
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=85',

      title:
        'Un moment spécial',

      date:
        'Un souvenir',

      description:
        'Il y a des moments que l’on aimerait pouvoir revivre encore et encore.',

      rotation:
        2
    },


    {
      id: 5,

      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85',

      title:
        'Un regard',

      date:
        'Une petite histoire',

      description:
        'Parfois une seule photo suffit pour raconter toute une histoire.',

      rotation:
        -1.5
    },


    {
      id: 6,

      image:
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',

      title:
        'Encore un souvenir',

      date:
        'À garder précieusement',

      description:
        'Un autre petit morceau de cette histoire.',

      rotation:
        1
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


  goToMoments(): void {

    this.router.navigate(['/moments']);

  }


  // ==========================================
  // LIGHTBOX
  // ==========================================

  openMemory(memory: Memory): void {

    this.selectedMemory = memory;

    document.body.style.overflow = 'hidden';

  }


  closeMemory(): void {

    this.selectedMemory = null;

    document.body.style.overflow = '';

  }


  // ==========================================
  // STARS
  // ==========================================

  private generateStars(): void {

    this.stars = Array.from(
      { length: 70 },
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

}