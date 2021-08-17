import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

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
import {AddFeedbackrequestComponent} from './components/add-feedbackrequest/add-feedbackrequest.component';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {GroupAddCourseComponent} from './admin_project/components/group/group-add-course/group-add-course.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MyGroupComponent} from './components/student/My-group/my-group.component';
import {PassedCoursesComponent} from './components/student/Passed-courses/passed-courses.component';
import {CurrentCoursesComponent} from './components/student/Current-courses/current-courses.component';
import {AvCoursesComponent} from './components/student/Av-courses/av-courses.component';

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
    AvCoursesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule, HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, MatDialogModule,
    MatDividerModule, MatSnackBarModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule, MatInputModule, MatToolbarModule, MatMenuModule, MatTableModule, MatTooltipModule, MatCheckboxModule, ReactiveFormsModule, MatCardModule, MatListModule, MatGridListModule, ScrollingModule, MatPaginatorModule, MatSelectModule, MatAutocompleteModule, MatChipsModule, MatSidenavModule,
  ],
  providers: [httpInterceptorProviders, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService, {
    provide: MatDialogRef,
    useValue: {}
  }, MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule {
}
