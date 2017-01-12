import { Injectable } from '@angular/core';
import {AngularFire, AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs/Rx';
import {Course} from './course';
import {Lesson} from './lesson';

@Injectable()
export class CoursesService {

  constructor(private db: AngularFireDatabase) { }

  findAllCourses(): Observable<Course[]> {
    return this.db.list('courses').map(Course.fromJsonList);
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.list('courses', {
      query: {
        orderByChild: 'url',
        equalTo: courseUrl
        // courseUrl is passed in here from our 'id' parameter in course-detail.
      }
    }).map(results => results[0]);
  }

  findLessonsForCourse(courseUrl: string): Observable<Lesson[]>{
    console.log(courseUrl);

    // query courses based on url.
    const course$ = this.findCourseByUrl(courseUrl);

    const lessonsPerCourse$ = course$
      .switchMap(course => this.db.list('lessonsPerCourse/' + course.$key))
      .do(console.log);

    lessonsPerCourse$.subscribe();
    // add a new rule for courses node.
    /*
    as part of the rules object, after read/write add courses:
    "courses" {
      ".indexOn" : ["url"]
    }
    */

    return Observable.of([]);
  }
}
