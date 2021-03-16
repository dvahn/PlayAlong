import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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
    this.plays = this.playCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    );
    
  }

  getPlays(): Observable<Play[]> {
    return this.plays;
  }

  getTracks(id): Observable<Track[]> {
    let tracks: Observable<Track[]>;
    tracks = this.afs.collection<Track>('Plays/'+id+'/tracks').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    );
    return tracks;
  } 
}
