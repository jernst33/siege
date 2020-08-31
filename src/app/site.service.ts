import { Injectable } from '@angular/core';
import {SiteModel} from './site.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  siteChanged = new Subject<SiteModel>();
  db = firebase.firestore();
  constructor(private firestore: AngularFirestore) {}

  getSitesInMap(mapId: string) {
    console.log('Using Map ID: ' + mapId);
    const sites = [];
    this.db.collection('sites').where('map', '==', mapId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          sites.push({
            id: doc.id,
            ...doc.data()
          } as SiteModel);
        });
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
    return sites;
  }
}
