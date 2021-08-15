import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {CoursesListComponent} from './components/courses-list/courses-list.component';
import {AddCourseComponent} from './components/add-course/add-course.component';
import {CourseDetailsComponent} from './components/course-details/course-details.component';
import {UserListComponent} from './admin_project/components/user/user-list/user-list.component';
import {UserComponent} from './components/user/user.component';
import {GroupsListComponent} from './admin_project/components/group/groups-list/groups-list.component';
import {StudentListComponent} from './admin_project/components/group/student-list/student-list.component';
import {GroupCourseListComponent} from './admin_project/components/group/group-course-list/group-course-list.component';
import {AddFeedbackrequestComponent} from './components/add-feedbackrequest/add-feedbackrequest.component';
import {GroupAddCourseComponent} from './admin_project/components/group/group-add-course/group-add-course.component';
import {RoleGuardService} from './auth/role-guard.service';
import {EnrolledStudentListComponent} from './admin_project/components/group/enrolled-student-list/enrolled-student-list.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin/users', component: UserListComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/groups', component: GroupsListComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/groups/:id/available-courses', component: GroupAddCourseComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/groups/:id/enrolled-students', component: EnrolledStudentListComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/students', component: StudentListComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/groups/:id/courses', component: GroupCourseListComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'courses', component: CoursesListComponent},
  {path: 'courses/:id', component: CourseDetailsComponent},
  {path: 'feedback_request/add', component: AddFeedbackrequestComponent},
  {path: 'add', component: AddCourseComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'users/:id', component: UserComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
