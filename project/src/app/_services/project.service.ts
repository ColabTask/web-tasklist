import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { Project } from '../_models/index';

@Injectable()
export class ProjectService {
    constructor(private http: Http) { }

    list() {
      return this.http.get('http://localhost:8000/api/v1/projects', this.jwt())
       .map((response: Response) => response.json());
    }

    get(id) {
        return this.http.get('http://localhost:8000/api/v1/projects/' + id, this.jwt())
        .map((response: Response) => response.json());
    }

    getUsers(id) {
        return this.http.get('http://localhost:8000/api/v1/projects/' + id + '/access', this.jwt())
        .map((response: Response) => response.json());
    }

    getTasksByEndDateLte(id, endDate) {
      let params = new URLSearchParams();
      params.set('end_date_lte', endDate);

      return this.http.get('http://localhost:8000/api/v1/projects/' + id + '/tasks', this.jwt(params))
      .map((response: Response) => response.json());
    }

    getTasks(id) {
      return this.http.get('http://localhost:8000/api/v1/projects/' + id + '/tasks', this.jwt())
       .map((response: Response) => response.json());
    }

    create(project: Project) {
        return this.http.post('http://localhost:8000/api/v1/projects', project, this.jwt())
        .map((response: Response) => response.json());
    }

    update(project: Project) {
        return this.http.patch('http://localhost:8000/api/v1/projects/' + project.id, project, this.jwt())
        .map((response: Response) => response.json());
    }

    delete(project: Project) {
      return this.http.delete('http://localhost:8000/api/v1/projects/' + project.id, this.jwt())
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
