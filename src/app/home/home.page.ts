import { AppRoutingModule } from './../app-routing.module';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

export interface Play {
  name: string;
  path: string;
  tracks: Track[];
}

export interface Track {
  name: string;
  path: string;
  type: string;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  allPlays: Play[] = [
    {
      name: 'Practice Play',
      path: './assets/plays/example',
      tracks: [
        {
          name: 'Alt 1',
          path: './assets/plays/example/Jenny Alt 1.wav', 
          type: 'sax'
        },
        {
          name: 'Alt 2',
          path: './assets/plays/example/Jenny Alt 2.wav',
          type: 'sax' 
        },
        {
          name: 'Barriton',
          path: './assets/plays/example/Jenny Barriton.wav',
          type: 'sax' 
        },
        {
          name: 'Tenor 1',
          path: './assets/plays/example/Jenny Tenor 1.wav',
          type: 'sax' 
        },
        {
          name: 'Tenor 2',
          path: './assets/plays/example/Jenny Tenor 2.wav',
          type: 'sax' 
        }
      ]
    },
    {
      name: 'play_1',
      path: './assets/plays/play_1',
      tracks: []
    },
    {
      name: 'play_2',
      path: './assets/plays/play_2',
      tracks: []
    }

  ]

  constructor(private router: Router) {}

  ngOnInit() {
    // this.allPlays = this.playLoaderService.displayAllPlays();
  }

  goToTrackView(selectedPlay) {
  
    let navExtras: NavigationExtras = {
      state: {
        play: selectedPlay,
      }
    }

    this.router.navigate(['/track'], navExtras)
  }


}
