import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {httpInterceptorProviders} from './auth/auth-interceptor';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {GroupsListComponent, NgbdModalContent} from './components/groups-list/groups-list.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    GroupsListComponent,
    NgbdModalContent
    AddCourseComponent,
    CourseDetailsComponent,
    CoursesListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule, HttpClientModule, FormsModule
  ],
  providers: [httpInterceptorProviders,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
