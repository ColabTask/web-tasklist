import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { Task } from '../_models/index';

@Injectable()
export class TaskService {
    constructor(private http: Http) { }

    printDate(date) {
        return this.padStr(date.getFullYear()) + '-' +
          this.padStr(1 + date.getMonth()) + '-' +
          this.padStr(date.getDate());
    }

    padStr(i) {
        return (i < 10) ? "0" + i : "" + i;
    }

    list() {
      return this.http.get('http://localhost:8000/api/v1/tasks', this.jwt())
       .map((response: Response) => response.json());
    }

    get(id) {
        return this.http.get('http://localhost:8000/api/v1/tasks/' + id, this.jwt())
        .map((response: Response) => response.json());
    }

    create(task: Task) {
      let data : any = task;
      data.project_id =  data.project.id ? data.project.id.toString() : null;
      data.assigned_id =  data.assigned.id ? data.assigned.id.toString() : null;

      return this.http.post('http://localhost:8000/api/v1/tasks', data, this.jwt())
      .map((response: Response) => response.json());
    }

    update(task: Task) {
      let data : any = task;
      data.assigned_id =  data.assigned.id ? data.assigned.id.toString() : null;
      if (data.end_date) {
        data.end_date = this.printDate(data.end_date);
      }

      return this.http.patch('http://localhost:8000/api/v1/tasks/' + data.id, data, this.jwt())
      .map((response: Response) => response.json());
    }

    delete(task: Task) {
      return this.http.delete('http://localhost:8000/api/v1/tasks/' + task.id, this.jwt())
       .map((response: Response) => response.json());
    }

    // private helper methods

    private jwt(params = null) {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Token ' + currentUser.token });
            let options;
            if(params){
              options = new RequestOptions({ headers: headers, search: params });
            }
            else {
              options = new RequestOptions({ headers: headers });
            }
            return options;
        }
    }
}
