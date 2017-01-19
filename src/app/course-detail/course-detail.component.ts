import { Component, OnInit } from '@angular/core';
import { Lesson } from '../shared/model/lesson';
import { Course } from '../shared/model/course';
import { CoursesService } from '../shared/model/courses.service';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  currentLessons$: Observable<Lesson[]>;
  course$ : Observable<Course>;

  constructor(private route: ActivatedRoute, private coursesService:CoursesService) { }

  ngOnInit() {
    // need to pass in the course id from URL
    const courseUrl = this.route.snapshot.params['id'];
    this.course$ = this.coursesService.findCourseByUrl(courseUrl);
    this.currentLessons$ = this.coursesService.loadFirstLessonsPage(courseUrl, 3);
    // this.lessons$ = this.coursesService.findLessonsForCourse(courseUrl);

  }

}
