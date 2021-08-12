import {Component, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';
import {MatSidenav} from "@angular/material/sidenav";

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
  navbarOpen = false;
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  constructor(private tokenStorage: TokenStorageService) {
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

}
