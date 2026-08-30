import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import {
  AuthService
} from '../../core/services/auth.service';


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


// =====================================================
// YOUTUBE
// =====================================================

declare const YT: any;


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
export class Home
  implements OnInit, OnDestroy {


  // =====================================================
  // YOUTUBE ELEMENT
  // =====================================================

  @ViewChild(
    'youtubePlayer',
    { static: true }
  )
  youtubePlayer!: ElementRef;


  private player: any = null;

  private youtubeReady = false;


  // =====================================================
  // MUSIC
  // =====================================================

  musicPlaying = false;

  private readonly youtubeVideoId = 'Edwsf-8F3sI';

  // =====================================================
  // STARS / HEARTS
  // =====================================================

  stars: Star[] = [];

  hearts: Heart[] = [];

  menuOpen = false;


  currentYear =
    new Date().getFullYear();


  // =====================================================
  // COUNTDOWN
  // =====================================================

  countdown: Countdown = {

    days: 0,

    hours: 0,

    minutes: 0,

    seconds: 0

  };


  private countdownInterval:
    ReturnType<typeof setInterval> | null = null;


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


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

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
    // Vérification connexion
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

    this.generateHearts();


    // -----------------------------------------------
    // Countdown
    // -----------------------------------------------

    this.startCountdown();


    // -----------------------------------------------
    // YouTube
    // -----------------------------------------------

    this.loadYouTubeAPI();

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

    this.stopMusic();

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

    this.updateCountdown();


    this.stopCountdown();


    this.countdownInterval =
      setInterval(() => {


        // Vérification session

        if (
          !this.authService
            .isAuthenticated()
        ) {

          this.stopCountdown();

          this.stopMusic();

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
  // YOUTUBE API
  // =====================================================

  private loadYouTubeAPI(): void {


    // API déjà chargée

    if (
      typeof YT !== 'undefined' &&
      YT.Player
    ) {

      this.createYouTubePlayer();

      return;

    }


    // Évite de charger le script
    // plusieurs fois

    if (
      document.getElementById(
        'youtube-api-script'
      )
    ) {

      const waitForAPI =
        setInterval(() => {

          if (
            typeof YT !== 'undefined' &&
            YT.Player
          ) {

            clearInterval(
              waitForAPI
            );

            this.createYouTubePlayer();

          }

        }, 100);


      return;

    }


    // Création du script

    const script =
      document.createElement(
        'script'
      );


    script.id =
      'youtube-api-script';


    script.src =
      'https://www.youtube.com/iframe_api';


    document.body.appendChild(
      script
    );


    // YouTube appelle cette fonction
    // lorsque son API est prête

    (window as any)
      .onYouTubeIframeAPIReady =
      () => {

        this.createYouTubePlayer();

      };

  }


  // =====================================================
  // CREATE YOUTUBE PLAYER
  // =====================================================

  private createYouTubePlayer(): void {

    if (
      this.player
    ) {

      return;

    }


    this.player =
      new YT.Player(
        this.youtubePlayer.nativeElement,
        {

          videoId:
            this.youtubeVideoId,


          playerVars: {

            autoplay: 0,

            controls: 0,

            modestbranding: 1,

            rel: 0,

            playsinline: 1

          },


          events: {

            onReady:
              () => {

                this.youtubeReady =
                  true;

              },


            onStateChange:
              (event: any) => {

                if (
                  event.data ===
                  YT.PlayerState.PLAYING
                ) {

                  this.musicPlaying =
                    true;

                }


                if (
                  event.data ===
                  YT.PlayerState.PAUSED
                ) {

                  this.musicPlaying =
                    false;

                }


                if (
                  event.data ===
                  YT.PlayerState.ENDED
                ) {

                  this.musicPlaying =
                    false;

                }


                this.cdr.detectChanges();

              }

          }

        }
      );

  }


  // =====================================================
  // TOGGLE MUSIC
  // =====================================================

  toggleMusic(): void {


    if (
      !this.player ||
      !this.youtubeReady
    ) {

      return;

    }


    if (
      this.musicPlaying
    ) {

      this.player.pauseVideo();

    }

    else {

      this.player.playVideo();

    }

  }


  // =====================================================
  // STOP MUSIC
  // =====================================================

  private stopMusic(): void {

    if (
      this.player &&
      this.youtubeReady
    ) {

      this.player.stopVideo();

    }


    this.musicPlaying =
      false;

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
            2 +
            Math.random() * 5

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
            7 +
            Math.random() * 8

        })

      );

  }


  // =====================================================
  // CLEANUP
  // =====================================================

  ngOnDestroy(): void {

    this.stopCountdown();

    this.stopMusic();

  }

}