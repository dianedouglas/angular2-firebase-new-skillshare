
import {Route} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CoursesComponent} from './courses/courses.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {LessonDetailComponent} from './lesson-detail/lesson-detail.component';
import {NewLessonComponent} from './new-lesson/new-lesson.component';
import {EditLessonComponent} from './edit-lesson/edit-lesson.component';
import { LessonResolver } from './shared/model/lesson.resolver';

export const routerConfig : Route[] = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'courses',
    children: [
      {
        path: ':id',
        children: [
          {
            path: '', //show same lessons per course if we are at blank child path
            component: CourseDetailComponent
          },
          {
            path: 'new', //if we are at courses/url/new we are adding a new lesson to a course
            component: NewLessonComponent
          }
        ]
      },
      {
        path: '',
        component: CoursesComponent
      }
    ]
  },
  {
    path: 'lessons/:id',
    children: [
      {
        path: '',
        component: LessonDetailComponent
      },
      {
        path: 'edit',
        component: EditLessonComponent,
        resolve: {
          lesson: LessonResolver
        }
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
