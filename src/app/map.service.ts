import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private firestore: AngularFirestore) {}

  getMaps() {
    return this.firestore.collection('maps').snapshotChanges();
  }

  getMap(mapId: string) {
    return this.firestore.collection('maps').doc(mapId).snapshotChanges();
  }
}
