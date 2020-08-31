import {Observable, of, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {switchMap} from 'rxjs/operators';
import {auth, User} from 'firebase';
import {OdysseusUser} from './user';
import {AuthData} from './auth-data.model';

@Injectable()
export class AuthService {

  private isAuthenticated = false;
  authChange = new Subject<boolean>();


  user$: Observable<OdysseusUser>;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<OdysseusUser> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    this.authChange.next(true);
    this.router.navigate(['home']);
    return userRef.set(data, {merge: true});
  }

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);

    firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password);

    // this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).
    // then(result => {
    //  // this.uiService.loadingStateChanged.next(false);
    // }).catch(error => {
    //   // this.uiService.loadingStateChanged.next(false);
    //  // this.uiService.showSnackbar(error.message, null, 3000);
    // });

    this.authChange.next(true);
    this.isAuthenticated = true;
    this.router.navigate(['dashboard']);
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    // this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
    //   .then(result => {
    //     this.uiService.loadingStateChanged.next(false);
    //   }).catch(error => {
    //   this.uiService.loadingStateChanged.next(false);
    //   this.uiService.showSnackbar(error.message, null, 3000);
    // });
    this.authChange.next(true);
    this.isAuthenticated = true;
    this.router.navigate(['home']);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.authChange.next(false);
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
