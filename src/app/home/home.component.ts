import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../shared/model/lessons.service';
import { Lesson } from '../shared/model/lesson';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lessonsProperty: Lesson[];

  constructor(private lessonsService: LessonsService) { }

  ngOnInit() {
    this.lessonsService.findAllLessons()
      .do(console.log)
      .subscribe(
        lessonsFromDB => this.lessonsProperty = lessonsFromDB
      )
  }

}
