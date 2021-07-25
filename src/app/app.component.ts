import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./auth/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'course-evaluation-client';
   roles: string[] | undefined;

  constructor(private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();

    }
  }
}
