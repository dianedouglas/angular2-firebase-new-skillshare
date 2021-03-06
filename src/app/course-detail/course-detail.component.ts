import { Component, OnInit } from '@angular/core';
import { Lesson } from '../shared/model/lesson';
import { Course } from '../shared/model/course';
import { CoursesService } from '../shared/model/courses.service';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  lessonsObservable$: Observable<Lesson[]>;
  course$ : Observable<Course>;
  lessons: Lesson[]; //we use this to get the last lesson's key from this page to use for next method
  courseUrl: string;
  constructor(private router: Router, private route: ActivatedRoute, private coursesService:CoursesService) { }

  ngOnInit() {
    // need to pass in the course id from URL
    this.courseUrl = this.route.snapshot.params['id'];
    this.course$ = this.coursesService.findCourseByUrl(this.courseUrl);
    this.lessonsObservable$ = this.coursesService.loadFirstLessonsPage(this.courseUrl, 3);
    this.lessonsObservable$.subscribe(lessons => this.lessons = lessons); // subscribe to observable to store it in property
    console.log(this.lessons);
    // need access to the last element of the lessons array to get its key. 
    // so we subscribe to observable retrieve lessons and store them in the lessons variable as not an observable.
    // also need to store course url as property to use it in multiple methods.

  }

  prev() {
    // get key of first lesson in array to pass in because this is what we will limit our results to. 
    // use 'endAt' this key and 'limitToLast' = 3 in query (in service) 
    // means start with this lesson key and count backwards to get 3 results. 
    // subscribe to output and store in same this.lessons property we've been using in template.
    this.coursesService.loadPrevPage(this.courseUrl, this.lessons[0].$key, 3)
      .subscribe(lessons => this.lessons = lessons);
  }

  next() {
    var lengthOfLessons = this.lessons.length;
    var keyOfLastLessonOnPage = this.lessons[lengthOfLessons - 1].$key;
    
    this.coursesService.loadNextPage(this.courseUrl, keyOfLastLessonOnPage, 3)
      .subscribe(lessons => this.lessons = lessons);
  }

  navigateToLesson(lesson:Lesson) {
    this.router.navigate(['lessons', lesson.url]);
  }

}
