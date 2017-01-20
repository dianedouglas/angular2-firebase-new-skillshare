import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Lesson } from './lesson';
import { AngularFire } from 'angularfire2';

@Injectable()
export class LessonsService {

  constructor(private af: AngularFire) { }


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
}
