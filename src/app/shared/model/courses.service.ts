import { Injectable } from '@angular/core';
import {AngularFire, AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs/Rx';
import {Course} from './course';
import {Lesson} from './lesson';
import {FirebaseListFactoryOpts} from "angularfire2/interfaces";

@Injectable()
export class CoursesService {

  constructor(private db: AngularFireDatabase) { }

  findAllCourses(): Observable<Course[]> {
    return this.db.list('courses').map(Course.fromJsonList);
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    // get a single course by querying its url
    return this.db.list('courses', {
      query: {
        orderByChild: 'url',
        equalTo: courseUrl
        // courseUrl is passed in here from our 'id' parameter in course-detail.
      }
    }).map(results => results[0]);
  }

  findLessonsForCourse(courseUrl: string): Observable<Lesson[]>{
    // given course url we want its lesson object observables
    // use course url to get array of lesson keys
    // pass that array of lesson keys into findLessonsForLessonKeys to get objects
    return this.findLessonsForLessonKeys(this.findLessonKeysPerCourseUrl(courseUrl));
  }


  findLessonKeysPerCourseUrl(courseUrl: string, query: FirebaseListFactoryOpts = {}): Observable<string[]> {
    // return the lesson keys that belong to an individual course including a query object optionally
    return this.findCourseByUrl(courseUrl)
      .switchMap(course => this.db.list('lessonsPerCourse/' + course.$key, query))
      .map(lspc => lspc.map(lpc => lpc.$key));
  }

  findLessonsForLessonKeys(lessonKeys$: Observable<string[]>):Observable<Lesson[]> {
    // don't know what this is doing exactly 
    // given an array of observable strings that are lesson keys 
    // we want to return the lesson objects
    // this is setup to use the output of findLessonKeysPerCourseUrl which is called from findLessonsForCourse and by loadFirstLessonsPage
    return lessonKeys$
      .map(lspc => lspc.map(lessonKey => this.db.object('lessons/' + lessonKey)))
      .flatMap(fbojs => Observable.combineLatest(fbojs))
  }

  loadFirstLessonsPage(courseUrl: string, pageSize: number): Observable<Lesson[]> {
    const firstPageLessonKeys$ = this.findLessonKeysPerCourseUrl(courseUrl,
      {
        query: {
          orderByKey: true,
          limitToFirst: pageSize
        }
      })
    .do(console.log);
    return this.findLessonsForLessonKeys(firstPageLessonKeys$);
  }

  loadNextPage(courseUrl:string, lessonKey:string, pageSize:number): Observable<Lesson[]> {
    const lessonKeys$ = this.findLessonKeysPerCourseUrl(courseUrl, 
    {
      query : {
        orderByKey: true,
        startAt: lessonKey,
        limitToFirst: pageSize + 1
      }
    });
    return this.findLessonsForLessonKeys(lessonKeys$)
      .map(lessons => lessons.slice(1, lessons.length));
  }

}
