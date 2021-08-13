import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';
import {MatSidenav} from "@angular/material/sidenav";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'course-evaluation-client';
  roles: string[] | undefined;
  username: string | undefined;
  id: string | undefined;
  navbarOpen = false;
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  @ViewChild('btnRef') buttonRef?: MatButton;
  isExpanded = true;
  isShowing = false;
  constructor(private tokenStorage: TokenStorageService,private router: Router) {
  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
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

  ngAfterViewInit(): void {
    this.buttonRef?.focus();
  }

}
