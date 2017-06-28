import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_services/index';
import { Project } from '../_models/index';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  templateUrl: 'projects.component.html'
})

export class ProjectsComponent implements OnInit {

  projects: Project[];
  error: any = {};
  suffix: any;

  constructor(
    private projectService: ProjectService,
    private _notificationsService: NotificationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.suffix = params['id'];
      this.getListOfProjects();
    });
  }

  getListOfProjects() {
    this.projectService.list()
    .subscribe(
      data => {
        this.projects = data;
      }
    );
  }
}
