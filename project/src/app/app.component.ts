import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService, AuthenticationService } from './_services/index';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean;
  model: any = {}
  leftNavbar: boolean = false;

  public options = {
      position: ["top", "right"],
      timeOut: 5000,
      lastOnBottom: true,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true,
      maxLength: 100,
      maxStack: 3
  }

  constructor(
    private router: Router,
    private eventService: TaskService,
    private _notificationsService: NotificationsService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.isLoggedInObservable().subscribe((val) => {
      this.isLoggedIn = val;
    });
  }

  createEvent() {
    this.eventService.create(this.model)
    .subscribe(
      data => {
        this._notificationsService.success(
            'Event created',
            'Your event has been created',
            {
                timeOut: 5000,
            }
        )
        this.router.navigate(['/admin', data.suffix]);
      },
      error => {
      }
    );
  }

  actionLeftNavbar() {
    this.leftNavbar = !this.leftNavbar;
  }
}
