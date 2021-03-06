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
import {AddFeedbackrequestComponent} from './components/manage-feedback-request/add-feedbackrequest/add-feedbackrequest.component';
import {FeedbackrequestListComponent} from './components/manage-feedback-request/feedbackrequest-list/feedbackrequest-list.component';
import {GroupAddCourseComponent} from './admin_project/components/group/group-add-course/group-add-course.component';
import {RoleGuardService} from './auth/role-guard.service';
import {EnrolledStudentListComponent} from './admin_project/components/group/enrolled-student-list/enrolled-student-list.component';
import {MyGroupComponent} from './components/student/My-group/my-group.component';
import {PassedCoursesComponent} from './components/student/Passed-courses/passed-courses.component';
import {CurrentCoursesComponent} from './components/student/Current-courses/current-courses.component';
import {AvCoursesComponent} from './components/student/Av-courses/av-courses.component';
import {AdminCourseListComponent} from "./admin_project/components/course/admin-course-list/admin-course-list.component";
import {ConfirmComponent} from './components/confirm/confirm.component';
import {AuthGuardService} from './auth/auth-guard.service';

import {AdminCreateCourseComponent} from './admin_project/components/course/admin-create-course/admin-create-course.component';
import {FeedbacksListComponent} from './components/manage-feedback-request/feedbacks-list/feedbacks-list.component';
import {FeedbackAnswerComponent} from './components/manage-feedback-request/feedback-answer/feedback-answer.component';
import {StudentFeedbackrequetComponent} from './components/student/StudentFeedbackrequest/studentfeedbackrequest.component';
import {AdminEditCourseComponent} from './admin_project/components/course/admin-edit-course/admin-edit-course.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {GroupChatComponent} from './components/student/Group-Chat/group-chat.component';
import {CoursesAnalyticsComponent} from './components/courses-analytics/courses-analytics.component';
import {FeedbackAnalyticsComponent} from "./components/feedback-analytics/feedback-analytics/feedback-analytics.component";
import {TotpComponent} from "./components/totp/totp.component";
import {AddfeedbackComponent} from "./components/student/AddFeedback/addfeedback.component";
import {ShowfeedbackComponent} from './components/student/ShowFeedback/showfeedback.component';
import {EditFeedbackrequestComponent} from './components/manage-feedback-request/edit-feedbackrequest/edit-feedbackrequest.component';
import {AvailableStudentsFeedbackrequestComponent} from './components/manage-feedback-request/available-students-feedbackrequest/available-students-feedbackrequest.component';
import {FeedbackRequestsArchiveComponent} from './components/manage-feedback-request/feedback-requests-archive/feedback-requests-archive.component';
import {PieChartsComponent} from './admin_project/components/charts/pie-charts/pie-charts.component';
import {ColumnChartComponent} from './admin_project/components/charts/column-chart/column-chart.component';
import {ChartsComponent} from './admin_project/components/charts/charts.component';
import {TeacherChatComponent} from './components/teacher/teacher-chat/teacher-chat.component';

import {CourseSatisfactionChartComponent} from './components/course-satisfaction-chart/course-satisfaction-chart.component';

import {ComplexChartComponent} from "./admin_project/components/charts/complex-chart/complex-chart.component";
import {TeachersListComponent} from './components/student/Teaches-list/teachers-list.component';
import {SplineChartComponent} from "./admin_project/components/charts/spline-chart/spline-chart.component";
import {CoursesTeacherComponent,} from "./components/student/Courses-teacher/courses-teacher.component";

ShowfeedbackComponent
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin/users', component: UserListComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'confirm', component: ConfirmComponent},
  {path: 'password_reset', component: ResetPasswordComponent},
  {path: 'totp', component: TotpComponent, canActivate: [RoleGuardService], data: {
    expectedRole: 'ROLE_PRE_VERIFICATION'
    }},

  {path: 'changePassword', component: ResetPasswordComponent},

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
  {path: 'admin/courses/:id/feedback_requests', component: FeedbackrequestListComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/courses/:id/feedback_requests/archive', component: FeedbackRequestsArchiveComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/courses/feedback_request/add/:id', component: AddFeedbackrequestComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/courses/:id/feedback_requests/:feedbackRequestsId', component: FeedbacksListComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/courses/:id/feedback_requests/:feedbackRequestsId/feedback/:feedbackId', component: FeedbackAnswerComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/courses/:id/feedback_requests/edit/:feedbackRequestsId', component: EditFeedbackrequestComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/courses/:id/feedback_requests/:feedbackRequestsId/students', component: AvailableStudentsFeedbackrequestComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/courses', component: AdminCourseListComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/courses/add', component: AdminCreateCourseComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/courses/:id', component: AdminEditCourseComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/analytics/pie', component: PieChartsComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/analytics/column', component: ColumnChartComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/analytics/complex', component: ComplexChartComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/analytics/spline', component: SplineChartComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'admin/analytics/charts', component: ChartsComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'courses', component: CoursesListComponent},
  {path: 'courses/:id', component: CourseDetailsComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_ADMIN'
    }},
  {path: 'teacher-chat', component: TeacherChatComponent, canActivate: [RoleGuardService],data:{
      expectedRole: 'ROLE_TEACHER'
    }},
  {path: 'add', component: AddCourseComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'users/:id', component: UserComponent},
  {path: 'my-group', component: MyGroupComponent},
  {path: 'passed-courses', component: PassedCoursesComponent},
  {path: 'current-courses', component: CurrentCoursesComponent},
  {path: 'av-courses', component: AvCoursesComponent},
  {path: 'feedback_request/course/:id', component: StudentFeedbackrequetComponent},
  {path: 'my-group/group-chat/:id', component: GroupChatComponent},
  {path: 'feedback/:id', component: ShowfeedbackComponent},
  {path: 'addfeedback/feedbackrequest/:id', component: AddfeedbackComponent},
  {path: 'my-group/groupChat/:id', component: GroupChatComponent},
  {path: 'satisfaction', component: CoursesAnalyticsComponent},
  {path: 'feedback-satisfaction', component: FeedbackAnalyticsComponent},
  {path: 'coursesatisfactionchart/:id', component: CourseSatisfactionChartComponent},
  {path: 'addfeedback/course/:idc/feedbackrequest/:id', component: AddfeedbackComponent},
  {path: 'teachers-list', component: TeachersListComponent},
  {path: 'teacher-courses/:id', component: CoursesTeacherComponent},
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
