import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DefenderService {

  constructor(private firestore: AngularFirestore) {
  }

  getDefenders() {
    return this.firestore.collection('defenders').snapshotChanges();
  }

}
