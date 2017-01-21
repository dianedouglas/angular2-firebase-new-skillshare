import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonsService } from "../shared/model/lessons.service";

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.css']
})
export class NewLessonComponent implements OnInit {

  constructor(private route:ActivatedRoute, private lessonsService:LessonsService) { }

  courseId: string;

  ngOnInit() {
    this.courseId = this.route.snapshot.queryParams['courseId'];
    console.log("course", this.courseId);
  }

  save(lessonData) {
    console.log('lessondata in save' + lessonData);
    this.lessonsService.createNewLesson(this.courseId, lessonData)
      .subscribe(
        () => {
          alert('lesson saved');
        },
        err => {
          alert('error:' + err);
        }
      );
  }

}
