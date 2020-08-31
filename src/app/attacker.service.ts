import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AttackerService {

  constructor(private firestore: AngularFirestore) {
  }

  getAttackers() {
    return this.firestore.collection('attackers').snapshotChanges();
  }
}
