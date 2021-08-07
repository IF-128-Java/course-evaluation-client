import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  currentUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    roles: [],
  };

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params.id);
  }

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
  ) { }

  getUser(id: number): void {
    this.userService.get(id).subscribe(data => {
        this.currentUser = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
