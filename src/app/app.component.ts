import { Component } from '@angular/core';
import { initializeApp, database } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAwuKl7qjXwEFV4e_XdCLY8goNChIMgc1w",
      authDomain: "tutorial-b967f.firebaseapp.com",
      databaseURL: "https://tutorial-b967f.firebaseio.com",
      storageBucket: "tutorial-b967f.appspot.com",
      messagingSenderId: "979501840072"
    };
    initializeApp(config);

    var root = database().ref('users');
    root.on('value', function(snap){
      var users = snap.val();
      var key = snap.key;
      // console.log(users[0].name);
      users.forEach(function(user){
        console.log(user.name);
      })
    })
  }
}
