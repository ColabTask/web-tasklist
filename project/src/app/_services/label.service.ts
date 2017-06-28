import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { Label } from '../_models/index';

@Injectable()
export class LabelService {
    constructor(private http: Http) { }

    listByProject(id) {
      return this.http.get('http://localhost:8000/api/v1/projects/' + id + '/labels', this.jwt())
       .map((response: Response) => response.json());
    }

    get(id) {
      return this.http.get('http://localhost:8000/api/v1/labels/' + id, this.jwt())
       .map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Token ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
