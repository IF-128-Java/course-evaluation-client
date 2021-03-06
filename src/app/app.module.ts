import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {httpInterceptorProviders} from './auth/auth-interceptor';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {GroupsListComponent} from './admin_project/components/group/groups-list/groups-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {UserListComponent} from './admin_project/components/user/user-list/user-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {UpdateRoleComponent} from './admin_project/components/user/update-role/update-role.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {AddCourseComponent} from './components/add-course/add-course.component';
import {CourseDetailsComponent} from './components/course-details/course-details.component';
import {CoursesListComponent} from './components/courses-list/courses-list.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {UserComponent} from './components/user/user.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CreateGroupComponent} from './admin_project/components/group/create-group/create-group.component';
import {EnrolledStudentListComponent} from './admin_project/components/group/enrolled-student-list/enrolled-student-list.component';
import {StudentListComponent} from './admin_project/components/group/student-list/student-list.component';
import {GroupCourseListComponent} from './admin_project/components/group/group-course-list/group-course-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {AddFeedbackrequestComponent} from './components/manage-feedback-request/add-feedbackrequest/add-feedbackrequest.component';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {CreateQuestionComponent} from './components/manage-feedback-request/create-question/create-question.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {GroupAddCourseComponent} from './admin_project/components/group/group-add-course/group-add-course.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MyGroupComponent} from './components/student/My-group/my-group.component';
import {PassedCoursesComponent} from './components/student/Passed-courses/passed-courses.component';
import {CurrentCoursesComponent} from './components/student/Current-courses/current-courses.component';
import {AvCoursesComponent} from './components/student/Av-courses/av-courses.component';
import {AdminCourseListComponent} from './admin_project/components/course/admin-course-list/admin-course-list.component';
import {AdminCreateCourseComponent} from './admin_project/components/course/admin-create-course/admin-create-course.component';
import {DialogForUpdateUserProfilePicture} from "./components/user/update-profile-picture-dialog/dialog-for-update-user-profile-picture.component";
import { ConfirmComponent } from './components/confirm/confirm.component';
import {GroupNotEmptyDialogComponent} from './admin_project/components/group/group-not-empty-dialog/group-not-empty-dialog.component';
import {FeedbackrequestListComponent} from './components/manage-feedback-request/feedbackrequest-list/feedbackrequest-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FeedbacksListComponent} from './components/manage-feedback-request/feedbacks-list/feedbacks-list.component';
import {FeedbackAnswerComponent} from './components/manage-feedback-request/feedback-answer/feedback-answer.component';
import {StudentFeedbackrequetComponent} from './components/student/StudentFeedbackrequest/studentfeedbackrequest.component';
import {AdminEditCourseComponent } from './admin_project/components/course/admin-edit-course/admin-edit-course.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EditFeedbackrequestComponent } from './components/manage-feedback-request/edit-feedbackrequest/edit-feedbackrequest.component';
import { AvailableStudentsFeedbackrequestComponent } from './components/manage-feedback-request/available-students-feedbackrequest/available-students-feedbackrequest.component';
import {MatRadioModule} from '@angular/material/radio';
import {GroupChatComponent} from './components/student/Group-Chat/group-chat.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { EditGroupComponent } from './admin_project/components/group/edit-group/edit-group.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CoursesAnalyticsComponent } from './components/courses-analytics/courses-analytics.component';
import { FeedbackAnalyticsComponent } from './components/feedback-analytics/feedback-analytics/feedback-analytics.component';
import { TotpComponent } from './components/totp/totp.component';
import { NotificationMessageComponent } from './components/manage-feedback-request/notification-message/notification-message.component';
import { FeedbackRequestsArchiveComponent } from './components/manage-feedback-request/feedback-requests-archive/feedback-requests-archive.component';
import {ShowfeedbackComponent} from './components/student/ShowFeedback/showfeedback.component';
import {AddfeedbackComponent} from './components/student/AddFeedback/addfeedback.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { PieChartsComponent } from './admin_project/components/charts/pie-charts/pie-charts.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import { ColumnChartComponent } from './admin_project/components/charts/column-chart/column-chart.component';
import { ChartsComponent } from './admin_project/components/charts/charts.component';
import {MatTabsModule} from '@angular/material/tabs';
import {TeacherChatComponent} from './components/teacher/teacher-chat/teacher-chat.component';
import { CourseSatisfactionChartComponent } from './components/course-satisfaction-chart/course-satisfaction-chart.component';
import { TeacherChartComponent } from './admin_project/components/charts/teacher-chart/teacher-chart.component';
import { ChartsModule } from 'ng2-charts';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { CloseDialogComponent } from './close-dialog/close-dialog.component';
import { CloseDialogService } from './close-dialog/close-dialog.service';
import { ComplexChartComponent } from './admin_project/components/charts/complex-chart/complex-chart.component';
import {TeachersListComponent} from "./components/student/Teaches-list/teachers-list.component";
import { ShowTeacherRateHistoryComponent } from './admin_project/components/charts/teacher-chart/show-teacher-rate-history/show-teacher-rate-history.component';
import { SplineChartComponent } from './admin_project/components/charts/spline-chart/spline-chart.component';
import {CoursesTeacherComponent} from "./components/student/Courses-teacher/courses-teacher.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddCourseComponent,
    CourseDetailsComponent,
    CoursesListComponent,
    GroupsListComponent,
    UserListComponent,
    GroupsListComponent,
    UpdateRoleComponent,
    UserComponent,
    EnrolledStudentListComponent,
    CreateGroupComponent,
    StudentListComponent,
    GroupCourseListComponent,
    AddFeedbackrequestComponent,
    GroupAddCourseComponent,
    MyGroupComponent,
    PassedCoursesComponent,
    CurrentCoursesComponent,
    CreateQuestionComponent,
    FeedbackrequestListComponent,
    FeedbacksListComponent,
    FeedbackAnswerComponent,
    CurrentCoursesComponent,
    AvCoursesComponent,
    AdminCourseListComponent,
    ConfirmComponent,
    AdminCreateCourseComponent,
    DialogForUpdateUserProfilePicture,
    GroupNotEmptyDialogComponent,
    StudentFeedbackrequetComponent,
    AdminEditCourseComponent,
    ResetPasswordComponent,
    EditGroupComponent,
    GroupChatComponent,
    CoursesAnalyticsComponent,
    FeedbackAnalyticsComponent,
    TotpComponent,
    ShowfeedbackComponent,
    AddfeedbackComponent,
    EditFeedbackrequestComponent,
    AvailableStudentsFeedbackrequestComponent,
    NotificationMessageComponent,
    FeedbackRequestsArchiveComponent,
    PieChartsComponent,
    ColumnChartComponent,
    ChartsComponent,
    TeacherChatComponent,
    CourseSatisfactionChartComponent,
    ConfirmationDialogComponent,
    CloseDialogComponent,
    ComplexChartComponent,
    TeachersListComponent,
    SplineChartComponent,
    TeacherChartComponent,
    ShowTeacherRateHistoryComponent,
    CoursesTeacherComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule, HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, MatDialogModule,
    MatDividerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    ScrollingModule,
    MatPaginatorModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatBadgeModule,
    MatSlideToggleModule,
    NgApexchartsModule,
    RatingModule.forRoot(),
    MatTabsModule,
    ChartsModule,
  ],
  providers: [ConfirmationDialogService, CloseDialogService, httpInterceptorProviders, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService, {
    provide: MatDialogRef,
    useValue: {}
  }, MatIconRegistry],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationDialogComponent, CloseDialogComponent ],
})
export class AppModule {
}
