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

  constructor() {

  }
}
