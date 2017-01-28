import { Component, OnInit } from '@angular/core';
import { Lesson } from '../shared/model/lesson';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../shared/model/lessons.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  currentLesson: Lesson;

  constructor(private router:Router, private route:ActivatedRoute, private lessonsService:LessonsService) { }

  ngOnInit() {
    // const lessonUrl = this.route.snapshot.params['id']; //for using this component more than once, prev/next lesson, 
    // snapshot doesn't work within ngOnInit - only called once when component loaded the first time.
    // const lesson$ = this.lessonsService.findLessonByUrl(lessonUrl);
    var lesson$ = this.route.params.switchMap(params => {
      const lessonUrl = params['id'];
      return this.lessonsService.findLessonByUrl(lessonUrl);
    });
    lesson$.subscribe(lesson => this.currentLesson = lesson);
  }

  next() {
    this.lessonsService.loadNextLesson(this.currentLesson.courseId, this.currentLesson.$key)
      .subscribe(
        lesson => this.router.navigate(['lessons', lesson.url])
      );
  }

  previous() {
    this.lessonsService.loadPreviousLesson(this.currentLesson.courseId, this.currentLesson.$key)
      .subscribe(
        lesson => this.router.navigate(['lessons', lesson.url])
      );
  }

  delete() {
    this.lessonsService.deleteLesson(this.currentLesson.$key)
      .subscribe(
          () => {
            alert('yo i am deleted son!');
          },
          console.error
        );
  }
  deleteLessonPerCourse() {
    this.lessonsService.deleteLessonPerCourse(this.currentLesson.$key, this.currentLesson.courseId)
      .subscribe(
          () => {
            alert('yo i am deleted son!');
            this.router.navigate(['/home']);
          },
          console.error
        );
  }

}
