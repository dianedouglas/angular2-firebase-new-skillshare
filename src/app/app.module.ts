import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { firebaseConfig } from "../environments/firebase.config";
import { authConfig } from "../environments/firebase.config";
import { AngularFireModule } from "angularfire2/index";
import { HomeComponent } from './home/home.component';
import {LessonsService} from "./shared/model/lessons.service";
import {AuthService} from "./shared/security/auth.service";
import {Lesson} from './shared/model/lesson';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import {RouterModule} from '@angular/router';
import {routerConfig} from './router.config';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesService } from './shared/model/courses.service';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { SafeUrlPipe } from './shared/security/safe-url.pipe'
import { ReactiveFormsModule } from '@angular/forms';
import { NewLessonComponent } from './new-lesson/new-lesson.component';
import { LessonFormComponent } from './lesson-form/lesson-form.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { LessonResolver } from './shared/model/lesson.resolver';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LessonsListComponent,
    TopMenuComponent,
    CoursesComponent,
    CourseDetailComponent,
    LessonDetailComponent,
    SafeUrlPipe,
    NewLessonComponent,
    LessonFormComponent,
    EditLessonComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routerConfig)
  ],
  providers: [LessonsService, CoursesService, LessonResolver, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
