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
    // get course observable we have navigated to by url.
    const course$ = this.findCourseByUrl(courseUrl);

    // go to the lessonsPerCourse table(node)
    // inside of there, find the course table by $key output lessons.
    // get back gross firebase object observable array.
    const lessonsPerCourse$ = course$
      .switchMap(course => this.db.list('lessonsPerCourse/' + course.$key))
      .do(console.log);

      // talking to the reference we got back from lessonsPerCourse above
      // for each firebaseObjectObservable in that array we call db.object to get back the observable for the lesson from the lessons table
      // this is at the address lessons/lessonkey
      // THEN we call flatmap on that and somehow that gives us an array of useable lesson objects.
    return lessonsPerCourse$
      .map(lessonsPerCourseParameter => lessonsPerCourseParameter.map(lesson => this.db.object('lessons/' + lesson.$key)) )
      .flatMap(fbojs => Observable.combineLatest(fbojs) )
      .do(console.log);
  }

}
