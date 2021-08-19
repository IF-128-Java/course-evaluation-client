import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  isConfirmed = false;

  constructor(private activeRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    const email = this.activeRoute.snapshot.queryParams.email;
    const code = this.activeRoute.snapshot.queryParams.code;

    if (code) {
      this.authService.confirm(code)
        .subscribe(() => this.isConfirmed = true);
    }
  }

}
