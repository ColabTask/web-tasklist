import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/index';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'logout.component.html'
})

export class LogoutComponent implements OnInit {

  email: string;
  password: string;
  error: string;

  constructor(
    private authenticationService: AuthenticationService,
    private _notificationsService: NotificationsService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.authenticationService.logout();
    this._notificationsService.success(
      'Logout',
      'Have a great day!',
      {
        timeOut: 2000
      }
    )
    this.router.navigate(["/login"]);
  }
}
