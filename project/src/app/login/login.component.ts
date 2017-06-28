import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/index';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

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
  }

  login(){
    console.log('Test to login')
    this.authenticationService.login(this.email, this.password)
    .subscribe(
      data => {
        this._notificationsService.success(
          'Login successful',
          'Welcome back!',
          {
            timeOut: 2000
          }
        )
        this.router.navigate(["/admin"]);
      },
      error => {
        this.error = JSON.parse(error._body);
      }
    );
  }
}
