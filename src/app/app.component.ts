import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {AppConfig} from "./common/app-config";
import {SiteNotificationService} from "./services/site-notification.service";
import {SiteNotification} from "./models/site-notification.model";

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

  notifications: SiteNotification[] = [];
  countUnreviewedNotifications: number = 0;
  private stompClient: any;

  constructor(private tokenStorage: TokenStorageService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private siteNotificationService: SiteNotificationService) {
    this.matIconRegistry.addSvgIcon('users',this.domSanitizer
      .bypassSecurityTrustResourceUrl('assets/images/admin-icons/users.svg'));
    this.matIconRegistry.addSvgIcon('students',this.domSanitizer
      .bypassSecurityTrustResourceUrl('assets/images/admin-icons/students.svg'));
    this.matIconRegistry.addSvgIcon('groups',this.domSanitizer
      .bypassSecurityTrustResourceUrl('assets/images/admin-icons/groups.svg'));
    this.matIconRegistry.addSvgIcon('courses',this.domSanitizer
      .bypassSecurityTrustResourceUrl('assets/images/admin-icons/courses.svg'));
    this.matIconRegistry.addSvgIcon('charts',this.domSanitizer
      .bypassSecurityTrustResourceUrl('assets/images/admin-icons/pie_chart.svg'));
  }


  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.username = this.tokenStorage.getUsername();
      this.id = this.tokenStorage.getId();
      this.getSiteNotifications()
      this.initializeWebSocketConnection();
    }
  }

  logout() {
    this.stompClient.disconnect(()=>{}, {});
    this.tokenStorage.signOut();
    window.location.href= '/home';
  }

  getSiteNotifications(){
    this.siteNotificationService.getSiteNotifications().subscribe(data => {
        this.notifications = data;
        this.notifications.sort((el1, el2) => el2.createdAt);
        this.countUnreviewedNotifications = this.notifications.filter((el) => !el.reviewed).length;
      },
      error => {
        console.log(error);
      }
    );
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(AppConfig.API_ADMIN_ENDPOINT + 'connect-ws');
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/api/v1/admin/event/site-notifications/users/' + this.id, (message: any) => {
        if(message.body) {
          let retrievedNotification = JSON.parse(message.body);
          this.notifications.unshift(retrievedNotification);
          this.countUnreviewedNotifications = this.notifications.filter((el) => !el.reviewed).length;
        }
      });
    });
  }

  setReviewed(notification: SiteNotification) {
    this.siteNotificationService.setReviewedSiteNotification(notification.id!).subscribe(() => {
        let foundNotification = this.notifications.find(el => el.id == notification.id);
        foundNotification!.reviewed = true;
        this.countUnreviewedNotifications = this.notifications.filter((el) => !el.reviewed).length;
      },
      error => {
        console.log(error);
      }
    );
  }
}
