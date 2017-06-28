import { Component, OnInit } from '@angular/core';
import { TaskService, ProjectService, LabelService, UserService } from '../_services/index';
import { Task, Project, Label, User, Access } from '../_models/index';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
    templateUrl: 'project.component.html'
})

export class ProjectComponent implements OnInit {

    tasks: any = {};
    dates: Array<any>;

    endDate: string;
    labels: Label[];
    users: User[];
    selectedTask: Task;
    error: any = {};
    validation: String;
    project_id: number;
    accessList: Array<Access>;

    today: Date = new Date();
    week: Date;

    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy.mm.dd',
        ariaLabelInputField: 'end_date',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
    };

    constructor(
      private taskService: TaskService,
      private projectService: ProjectService,
      private labelService: LabelService,
      private userService: UserService,
      private activatedRoute: ActivatedRoute,
      private _notificationsService: NotificationsService) {
    }

    ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => {
        // Init date to create link in nav
        this.today = new Date();
        this.today.setHours(0);
        this.today.setMinutes(0);
        this.today.setSeconds(0, 0);
        this.week = new Date();
        this.week.setSeconds(this.week.getSeconds() + 604800);

        // Get project_id to filter
        this.project_id = params['id'];

        // Get end_date to filter
        this.endDate = params['endDate'];

        // Selected task to open edit panel
        this.selectedTask = null;

        // Get data from API
        this.getListOfTasks(this.endDate);
        this.getListOfLabels();
        this.getListOfUsers();
      });
    }

    addTaskToList(task) {
      if (task.end_date.getTime() >= this.today.getTime()) {
        // If task is in the future
        if (this.dates.indexOf(task.getEndDate()) < 0) {
          this.dates.push(task.getEndDate());
          this.tasks[task.getEndDate()] = [];
        }
        this.tasks[task.getEndDate()].push(task);
      }
      else {
        // If task end_date is outdated
        if (this.dates.indexOf('Outdated') < 0) {
          this.dates.push('Outdated');
          this.tasks['Outdated'] = [];
        }
        this.tasks['Outdated'].push(task);
      }
    }

    getListOfTasks(endDate = null) {
      this.tasks = {};
      this.dates = [];
      if (endDate) {
        this.projectService.getTasksByEndDateLte(this.project_id, endDate)
        .subscribe(
          data => {
            data.map((task) => {
              console.log(task.end_date);
              let newTask = new Task(task);
              console.log(newTask.end_date);
              console.log(newTask.getEndDate());
              this.addTaskToList(newTask);
            })
          }
        );
      }
      else {
        this.projectService.getTasks(this.project_id)
        .subscribe(
          data => {
            data.map((task) => {
              let newTask = new Task(task);
              this.addTaskToList(newTask);
            })
          }
        );
      }
    }

    getListOfLabels() {
      this.labelService.listByProject(this.project_id)
      .subscribe(
        data => {
          this.labels = data;
        }
      );
    }

    getListOfUsers() {
      this.users = [];
      this.projectService.getUsers(this.project_id)
      .subscribe(
        data => {
          data.map((access) => {
            this.userService.get(access.user)
            .subscribe(
              data => {
                this.users.push(data);
              }
            );
          })
        }
      );
    }

    updateTask() {
      if (this.selectedTask.id) {
        this.taskService.update(this.selectedTask)
        .subscribe(
          data => {
            this.selectedTask = null;
            this.getListOfTasks();
            this._notificationsService.success(
                'Task updated',
                'The task has been correctly updated',
                {
                  timeOut: 2000
                }
            )
          },
          error => {
              this.error = JSON.parse(error._body);
          }
        );
      }
      else {
        this.taskService.create(this.selectedTask)
        .subscribe(
          data => {
            this.selectedTask = null;
            this.getListOfTasks();
            this._notificationsService.success(
                'Task created',
                'The new task has been correctly created',
                {
                  timeOut: 2000
                }
            )
          },
          error => {
              this.error = JSON.parse(error._body);
          }
        );
      }
    }

    deleteTask(task) {
      this.taskService.delete(task)
      .subscribe(
        data => {
          if (this.selectedTask && this.selectedTask.id == task.id) {
            this.selectedTask = null;
          }
          this.getListOfTasks();
          this._notificationsService.success(
              'Task deleted',
              'The task has been deleted',
              {
                timeOut: 2000
              }
          )
        },
        error => {
            this.error = JSON.parse(error._body);
        }
      );
    }

    addTask() {
      this.selectedTask = new Task();
      this.selectedTask.project.id = this.project_id;
    }

    changeSelectedTask(task) {
      this.selectedTask = new Task(JSON.parse(JSON.stringify(task)));
    }

    close() {
      this.selectedTask = null;
    }

    getLabelColor(label) {
      return '#' + label.color;
    }

    onDateChanged(event: IMyDateModel) {
        this.selectedTask.end_date = event.jsdate;
        console.log(this.selectedTask.end_date);
    }
}
