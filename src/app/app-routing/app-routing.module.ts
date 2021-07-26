import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CoursesListComponent} from "../components/courses-list/courses-list.component";
import {CourseDetailsComponent} from "../components/course-details/course-details.component";
import {AddCourseComponent} from "../components/add-course/add-course.component";


const routes: Routes = [
  {path: '', redirectTo: 'courses', pathMatch: 'full'},
  {path: 'courses', component: CoursesListComponent},
  {path: 'courses/:id', component: CourseDetailsComponent},
  {path: 'add', component: AddCourseComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
