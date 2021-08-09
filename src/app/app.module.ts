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
import {GroupsListComponent, NgbdModalContent} from './components/admin/group/groups-list/groups-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from "@angular/material/input";
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
import {AddFeedbackrequestComponent} from './components/add-feedbackrequest/add-feedbackrequest.component';
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";

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
    NgbdModalContent,
    UserListComponent,
    UpdateRoleComponent,
    AddFeedbackrequestComponent,
  ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule, HttpClientModule,
        FormsModule,
        BrowserAnimationsModule, MatDialogModule,
        MatButtonModule, MatIconModule, MatInputModule, MatToolbarModule, MatMenuModule, MatTableModule, MatTooltipModule, MatCheckboxModule, ReactiveFormsModule, MatCardModule, MatListModule, MatSelectModule, MatAutocompleteModule, MatChipsModule,
    ],
  providers: [httpInterceptorProviders, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService, {
    provide: MatDialogRef,
    useValue: {}
  },],
  bootstrap: [AppComponent]
})
export class AppModule {
}
