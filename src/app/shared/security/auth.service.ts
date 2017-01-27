import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/index';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email, password):Observable<any>{
    // call the login method on angularfire's firebaseauth module, returns promise, convert to observable.
    return this.fromFirebaseAuthPromise(this.auth.login({ email: email, password: password }));
  }

  //method to convert a promise into an observable to return above.
  fromFirebaseAuthPromise(promise):Observable<any> {
    const subject = new Subject<any>();
    promise.then(
      res => {
        subject.next(res);
        subject.complete();
      },
      err => {
        subject.error(err);
        subject.complete();
      }
    );
    return subject.asObservable();
  }
}
