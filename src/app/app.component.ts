import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'course-evaluation-client';
  roles: string[] | undefined;
  username: string | undefined;
  id: string | undefined;
  public isExpanded = false;


  constructor(private tokenStorage: TokenStorageService,private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer,) {
    this.matIconRegistry.addSvgIcon('users',this.domSanitizer
      .bypassSecurityTrustResourceUrl('assets/images/admin-icons/users.svg'));
    this.matIconRegistry.addSvgIcon('students',this.domSanitizer
      .bypassSecurityTrustResourceUrl('assets/images/admin-icons/students.svg'));
    this.matIconRegistry.addSvgIcon('groups',this.domSanitizer
      .bypassSecurityTrustResourceUrl('assets/images/admin-icons/groups.svg'));
    this.matIconRegistry.addSvgIcon('courses',this.domSanitizer
      .bypassSecurityTrustResourceUrl('assets/images/admin-icons/courses.svg'));
  }


  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.username = this.tokenStorage.getUsername();
      this.id = this.tokenStorage.getId();
    }
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }



}
