import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {CoursesListComponent} from './components/courses-list/courses-list.component';
import {AddCourseComponent} from './components/add-course/add-course.component';
import {CourseDetailsComponent} from './components/course-details/course-details.component';
import {UserListComponent} from './admin_project/components/user/user-list/user-list.component';
import {GroupsListComponent} from './admin_project/components/group/groups-list/groups-list.component';
import {StudentListComponent} from './admin_project/components/group/student-list/student-list.component';
import {GroupCourseListComponent} from './admin_project/components/group/group-course-list/group-course-list.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin/users', component: UserListComponent, canActivate: [AuthGuardService]},
  {path: 'admin/groups', component: GroupsListComponent, canActivate: [AuthGuardService]},
  {path: 'admin/students', component: StudentListComponent, canActivate: [AuthGuardService]},
  {path: 'admin/groups/:id/courses', component: GroupCourseListComponent, canActivate: [AuthGuardService]},
  {path: 'courses', component: CoursesListComponent},
  {path: 'courses/:id', component: CourseDetailsComponent},
  {path: 'add', component: AddCourseComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
