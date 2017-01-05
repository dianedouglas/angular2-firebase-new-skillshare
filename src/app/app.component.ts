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
  courses$: FirebaseListObservable<any>;
  lesson$: FirebaseObjectObservable<any>;
  constructor(private af: AngularFire) {
    // $ means it is an observable
    this.courses$ = af.database.list('courses');
    this.lesson$ = af.database.object('lessons/-K_fUAmEmMdo2RQUCLWt');
    this.courses$.subscribe(
      val => console.log(val)
    );
    this.lesson$.subscribe(
      val => console.log(val)
    )
  }
  listPush() {
    this.courses$.push({name: 'Wizardry'})
      .then(
        () => console.log('List Push Done'),
        () => console.log('There was an error.')
      );
  }
  listRemove() {

  }
  listUpdate() {

  }
  objUpdate() {

  }
  objSet() {

  }
}
