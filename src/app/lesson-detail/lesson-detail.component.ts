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

  constructor(private route:ActivatedRoute, private lessonsService:LessonsService) { }

  ngOnInit() {
    const lessonUrl = this.route.snapshot.params['id'];
    const lesson$ = this.lessonsService.findLessonByUrl(lessonUrl);
    lesson$.subscribe(lesson => this.currentLesson = lesson);
  }

}
