import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private playCollection: AngularFirestoreCollection<Play>;
  private plays: Observable<Play[]>;

  constructor(private afs: AngularFirestore) { 
    this.playCollection = this.afs.collection<Play>('Plays');
    this.plays = this.playCollection.valueChanges();
    
  }

  getPlays(): Observable<Play[]> {
    return this.plays;
  }
}
