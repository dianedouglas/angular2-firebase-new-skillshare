import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../shared/model/lesson';


@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {

  lesson: Lesson;

  constructor(private route: ActivatedRoute) {  
    //receives input data for the component before component was created by router.
    route.data.subscribe(
      data => this.lesson = data['lesson']
    )
  }

  ngOnInit() {
  }

}
