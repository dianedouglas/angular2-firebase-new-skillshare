import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../shared/model/lesson';
import { LessonsService } from "../shared/model/lessons.service";


@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {

  lesson: Lesson;

  constructor(private route: ActivatedRoute,  private lessonsService:LessonsService) {  
    //receives input data for the component before component was created by router.
    route.data.subscribe(
      data => this.lesson = data['lesson']
    )
  }

  ngOnInit() {
  }

  save(lessonData) {
    console.log(this.lesson);
    lessonData['courseId'] = this.lesson.courseId;
    lessonData['duration'] = this.lesson.duration;
    this.lessonsService.saveEditedLesson(this.lesson.$key, lessonData)
      .subscribe(
        () => {
          alert('edited lesson saved');
        },
        err => {
          alert('error saving lesson: ' + err);
        }
      )
  }

}
