import { Component } from '@angular/core';
import { initializeApp, database } from 'firebase';
import { firebaseConfig } from '../environments/firebase.config';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable  } from "angularfire2";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(private af: AngularFire) {
    // $ means it is an observable
    const courses$ : FirebaseListObservable<any> =  af.database.list('courses');
    courses$.subscribe(
      val => console.log(val)
    );

    const course$ : FirebaseObjectObservable<any> = af.database.object('courses/-K_fUAmBdZLQRnQWPmQM')
    course$.subscribe(
      val => console.log(val)
    )
  }
}
