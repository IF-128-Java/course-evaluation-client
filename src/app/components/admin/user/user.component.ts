import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../admin_project/services/user.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] | undefined;
  errorMessage: string | undefined;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserList().subscribe(
      data => {
        this.users = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

}
