import { Component } from '@angular/core';
import { initializeApp, database } from 'firebase';
import { firebaseConfig } from '../environments/firebase.config';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable  } from "angularfire2";
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  courses$: FirebaseListObservable<any>;
  lesson$: FirebaseObjectObservable<any>;
  firstCourse: any;

  constructor(private af: AngularFire) {
    // $ means it is an observable
    this.courses$ = af.database.list('courses');
    this.lesson$ = af.database.object('lessons/-K_fUAmEmMdo2RQUCLWt');
    this.courses$.subscribe(
      val => console.log(val)
    );
    this.lesson$.subscribe(
      val => console.log(val)
    );
    this.courses$.map(courses => courses[0])
      .subscribe(
        course => this.firstCourse = course
      );
  }
  listPush() {
    // one object at a time for push method.
    this.courses$.push({name: 'Wizardry'})
      .then(
        () => console.log('List Push Done'),
        () => console.log('There was an error.')
      );
  }
  listRemove() {
    this.courses$.remove(this.firstCourse);
  }
  listUpdate() {

  }
  objUpdate() {

  }
  objSet() {

  }
}
