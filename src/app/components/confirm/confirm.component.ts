import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  public isConfirmed = false;

  constructor(private activeRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    // const email = this.activeRoute.snapshot.queryParams.email;
    console.log("confirm service")
    const code = this.activeRoute.snapshot.queryParams.token;
    console.log(code);

    if (code) {
      this.authService.isConfirm(code)
        .subscribe(() => this.isConfirmed = true
        );
    }
    console.log(this.isConfirmed)
  }
}
