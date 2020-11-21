import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Howl } from 'howler';
import { IonRange, Platform } from '@ionic/angular';
import { TrackPageModule } from './track.module';

export interface Track {
  name: string;
  path: string;
}

export interface Play {
  name: string;
  path: string;
  tracks: Track[];
}

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {

  isPlaying: Boolean = false;
  play: Play;
  tracks: Howl[];
  progress = 0;
  @ViewChild('durationRange', { static: false }) range: IonRange;
  
  track_0: Howl = null;
  track_1: Howl = null;
  track_2: Howl = null;
  track_3: Howl = null;
  track_4: Howl = null;
  track_5: Howl = null;
  track_6: Howl = null;
  track_7: Howl = null;
  track_8: Howl = null;
  track_9: Howl = null; 

  constructor(private route: ActivatedRoute ,private router: Router, private plt: Platform) { 
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.play = this.router.getCurrentNavigation().extras.state.play;
        // this.tracks = this.play.tracks;
      }
    });
  }

  ngOnInit() {
    this.setUpTracks();
  }

  goBackToTrackOverview() {
    this.router.navigate(['/home'])
  }

  changeTrackVolume(track){
    //hier ausgewählten Track muten oder unmuten

  }

  setUpTracks() {
    if(this.play.tracks[0]) {
      this.track_0 = new Howl({
        src: [this.play.tracks[0].path],
        onplay: () => {
          this.updateProgress();
        },
        onend: () => {
          this.isPlaying = false;
        }
      });
    }
    if(this.play.tracks[1]) {
      this.track_1 = new Howl({
        src: [this.play.tracks[1].path]
      });
    }
    if(this.play.tracks[2]) {
      this.track_2 = new Howl({
        src: [this.play.tracks[2].path]
      });
    }
    if(this.play.tracks[3]) {
      this.track_3 = new Howl({
        src: [this.play.tracks[3].path]
      });
    }
    if(this.play.tracks[4]) {
      this.track_4 = new Howl({
        src: [this.play.tracks[4].path]
      });
    }
    if(this.play.tracks[5]) {
      this.track_5 = new Howl({
        src: [this.play.tracks[5].path]
      });
    }if(this.play.tracks[6]) {
      this.track_6 = new Howl({
        src: [this.play.tracks[6].path]
      });
    }if(this.play.tracks[7]) {
      this.track_7 = new Howl({
        src: [this.play.tracks[7].path]
      });
    }if(this.play.tracks[8]) {
      this.track_8 = new Howl({
        src: [this.play.tracks[8].path]
      });
    }if(this.play.tracks[9]) {
      this.track_9 = new Howl({
        src: [this.play.tracks[9].path]
      });
    }
    this.tracks = [this.track_0, this.track_1, this.track_2, this.track_3, this.track_4, this.track_5, this.track_6, this.track_7, this.track_8, this.track_9];
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;

    // if(!this.isPlaying) {
    //   this.track_0.pause();
    //   this.track_1.pause();
    //   this.track_2.pause();
    //   this.track_3.pause();
    //   this.track_4.pause();
    //   this.track_5.pause();
    //   this.track_6.pause();
    //   this.track_7.pause();
    //   this.track_8.pause();
    //   this.track_9.pause();
    // } else {
    //   this.track_0.play();
    //   this.track_1.play();      
    //   this.track_2.play();      
    //   this.track_3.play();      
    //   this.track_4.play();      
    //   this.track_5.play();      
    //   this.track_6.play();      
    //   this.track_7.play();      
    //   this.track_8.play();      
    //   this.track_9.play();      
    // }
    if(this.isPlaying) {
      for(let i = 0; i<this.tracks.length; i++) {
        this.tracks[i].play();
      }
    } else {
      for(let i = 0; i<this.tracks.length; i++) {
        this.tracks[i].pause();
      }
    }
  }
 
  updateProgress() {
    let seek = this.track_0.seek();
    this.progress = (seek / this.track_0.duration()) * 100;
    setTimeout( () => {
      this.updateProgress();
    }, 100);
  }

  seek() {
    let newValue = +this.range.value;
    let duration = this.track_0.duration();
    for(let i = 0; i<this.tracks.length; i++) {
      this.tracks[i].seek(duration * (newValue / 100));
    }
  }
}
