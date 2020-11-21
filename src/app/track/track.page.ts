import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Howl } from 'howler';
import { IonRange, Platform } from '@ionic/angular';

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
  @ViewChild('durationRange', { static: false }) durationRange: IonRange;
  @ViewChild('volumeRange_0', { static: false }) volumeRange_0: IonRange;
  @ViewChild('volumeRange_1', { static: false }) volumeRange_1: IonRange;
  @ViewChild('volumeRange_2', { static: false }) volumeRange_2: IonRange;
  @ViewChild('volumeRange_3', { static: false }) volumeRange_3: IonRange;
  @ViewChild('volumeRange_4', { static: false }) volumeRange_4: IonRange;
  @ViewChild('volumeRange_5', { static: false }) volumeRange_5: IonRange;
  @ViewChild('volumeRange_6', { static: false }) volumeRange_6: IonRange;
  @ViewChild('volumeRange_7', { static: false }) volumeRange_7: IonRange;
  @ViewChild('volumeRange_8', { static: false }) volumeRange_8: IonRange;
  @ViewChild('volumeRange_9', { static: false }) volumeRange_9: IonRange;

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
      }
    });
  }

  ngOnInit() {
    this.setUpTracks();
  }

  goBackToTrackOverview() {
    this.router.navigate(['/home'])
  }

  // TODO: 
  // - Ladeanzeige bei switch auf Tracks-Seite
  // - Volume-Regler an einzelnen Tracks
  // - Replay-Button

  setUpTracks() {
    if(this.play.tracks[0]) {
      this.track_0 = new Howl({
        src: [this.play.tracks[0].path],
        volume: 0.5,
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
        src: [this.play.tracks[1].path],
        volume: 0.5
      });
    }
    if(this.play.tracks[2]) {
      this.track_2 = new Howl({
        src: [this.play.tracks[2].path],
        volume: 0.5
      });
    }
    if(this.play.tracks[3]) {
      this.track_3 = new Howl({
        src: [this.play.tracks[3].path],
        volume: 0.5
      });
    }
    if(this.play.tracks[4]) {
      this.track_4 = new Howl({
        src: [this.play.tracks[4].path],
        volume: 0.5
      });
    }
    if(this.play.tracks[5]) {
      this.track_5 = new Howl({
        src: [this.play.tracks[5].path],
        volume: 0.5
      });
    }if(this.play.tracks[6]) {
      this.track_6 = new Howl({
        src: [this.play.tracks[6].path],
        volume: 0.5
      });
    }if(this.play.tracks[7]) {
      this.track_7 = new Howl({
        src: [this.play.tracks[7].path],
        volume: 0.5
      });
    }if(this.play.tracks[8]) {
      this.track_8 = new Howl({
        src: [this.play.tracks[8].path],
        volume: 0.5
      });
    }if(this.play.tracks[9]) {
      this.track_9 = new Howl({
        src: [this.play.tracks[9].path],
        volume: 0.5
      });
    }
    this.tracks = [this.track_0, this.track_1, this.track_2, this.track_3, this.track_4, this.track_5, this.track_6, this.track_7, this.track_8, this.track_9];
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;

    if(this.isPlaying) {
      for(let i = 0; i<this.tracks.length; i++) {
        this.tracks[i] ? this.tracks[i].play() : 0;
      }
    } else {
      for(let i = 0; i<this.tracks.length; i++) {
        this.tracks[i] ? this.tracks[i].pause() : 0;
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
    let newValue = +this.durationRange.value;
    let duration = this.track_0.duration();
    for(let i = 0; i<this.tracks.length; i++) {
      this.tracks[i] ? this.tracks[i].seek(duration * (newValue / 100)) : 0;
    }
  }

  changeTrackVolume(track, volumeRange){
    let newValue = +volumeRange.value;
    track.volume(newValue / 100);
  }

}
