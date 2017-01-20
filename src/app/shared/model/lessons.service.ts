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
}
