import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Lesson } from './lesson';
import { AngularFire, FirebaseRef } from 'angularfire2';
import { Subject } from "rxjs/Rx";
import { Http } from '@angular/http';
import { firebaseConfig } from "../../../environments/firebase.config";

@Injectable()
export class LessonsService {

  sdkDb: any;

  constructor(private af: AngularFire, @Inject(FirebaseRef) fb, private http:Http) { 
    this.sdkDb = fb.database().ref();
  }


  findAllLessons(): Observable<Lesson[]> {

    return this.af.database.list('lessons')
      .do(console.log)
      .map(lessonsAsJson => Lesson.fromJsonList(lessonsAsJson));

  }

  findLessonByUrl(url:string):Observable<Lesson> {
    return this.af.database.list('lessons', {
      query: { //use orderByChild if you want to sort by a model property.
        orderByChild: 'url',
        equalTo: url
      }
    }).map(results => results[0]); // get the first one that matches.
  }

  loadNextLesson(courseId:string, lessonKey:string): Observable<Lesson> {
    return this.af.database.list('lessonsPerCourse/' + courseId, {
      query: {
        orderByKey: true,
        startAt: lessonKey,
        limitToFirst: 2
      }
    }) // then with map return second result because we start at current lesson in results and get next which we want
    .map(results => results[1].$key) //this returns a string of the key of the next lesson key in an array.
    .switchMap(lessonId => this.af.database.object('lessons/' + lessonId)) //this returns plain JS object. format into instance of Lesson:
    .map(Lesson.fromJson);
  }

  loadPreviousLesson(courseId:string, lessonKey:string): Observable<Lesson> {
    return this.af.database.list('lessonsPerCourse/' + courseId, {
      query: {
        orderByKey: true,
        endAt: lessonKey,
        limitToLast: 2 //end at and count backwards 2 results total. 
      }
    }) // then with map return first result because we order by key and we want the previous one.
    .map(results => results[0].$key) //this returns a string of the key of the previous lesson key in an array.
    .switchMap(lessonId => this.af.database.object('lessons/' + lessonId)) //this returns plain JS object. format into instance of Lesson:
    .map(Lesson.fromJson);
  }

  createNewLesson(courseId:string, lessonData:any):Observable<any> {
    // prepare data we want to save. create new object passing lesson data and courseId
    const lessonToSave = Object.assign({}, lessonData, { courseId: courseId });
    // create new id of lesson by saying:
    // hey sdk create a child in the lessons table
    // call push method without passing in the data yet to just create the slot. 
    // call '.key' to get the key property and store it.
    const newLessonKey = this.sdkDb.child('lessons').push().key;
    // then we want to save both into lessons and lessonsPerCourse at the same time to make sure they are consistent.
    // create empty object of data to save.
    let dataToSave = {};
    // add property with URL for each table. 
    dataToSave["lessons/" + newLessonKey] = lessonToSave;
    dataToSave["lessonsPerCourse/" + courseId + "/" + newLessonKey] = true;
    // save into both tables at once. we will need this to edit lessons too, so separate function.
    return this.firebaseUpdate(dataToSave);

  }

  saveEditedLesson(lessonId:string, lesson):Observable<any>{
    // put the lesson data into a blank object
    const lessonToSave = Object.assign({}, lesson);
    //we don't want the key to be inside of the lessonToSave object because it's part of the url.
    delete(lessonToSave.$key); 
    let dataToSave = {};
    // then we save the lesson data inside of an object with key at lessons/lessonId
    dataToSave['lessons/' + lessonId] = lessonToSave;
    // this time we don't need to update the lessonsPerCourse because the association is already there.
    return this.firebaseUpdate(dataToSave);
  }

  firebaseUpdate(dataToSave) {
    // create rxjs subject so that we can convert it to an observable to return. 
    const subject = new Subject();
    this.sdkDb.update(dataToSave)
      .then(
          val => {
            subject.next(val);
            subject.complete();
          },
          err => {
            subject.error(err);
            subject.complete();
          }
        );
    return subject.asObservable();
  }

  deleteLesson(lessonId: string):Observable<any> {
    const url = firebaseConfig.databaseURL + '/lessons/' + lessonId + '.json';
    return this.http.delete(url);
  }

  deleteLessonPerCourse(lessonId: string, courseId:string):Observable<any> {
    const urlLessonsPerCourse = firebaseConfig.databaseURL + '/lessonsPerCourse/' + courseId + '/' + lessonId + '.json';
    return this.http.delete(urlLessonsPerCourse);
  }
}
