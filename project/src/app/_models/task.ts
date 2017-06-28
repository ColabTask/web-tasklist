import { Project, Label, User } from '../_models/index';

export class Task {
  id:number;
  name:string;
  description:string;
  priority:number;
  done:boolean;
  assigned:User;
  created_by:User;
  creation_date:Date;
  end_date:Date;
  project:Project;

  constructor(data:Object = {}) {
    this.id = data['id']||null
    this.name = data['name']||''
    this.description = data['description']||''
    this.priority = data['priority']||0
    this.done = data['done']||false,
    this.assigned = new User(data['assigned']||{})
    this.created_by = null
    this.creation_date = null
    this.end_date = new Date(data['end_date'])||null
    if (this.end_date) {
      let seconds = this.end_date.getUTCSeconds();
      let secondsOffset = this.end_date.getTimezoneOffset() * 60;
      this.end_date.setUTCSeconds(seconds + secondsOffset);
    }
    this.project = new Project(data['project']||{})
  }

  getEndDate(){
    return this._padStr(this.end_date.getUTCFullYear()) + '-' +
          this._padStr(1 + this.end_date.getUTCMonth()) + '-' +
          this._padStr(this.end_date.getUTCDate());
  }

  _padStr(i) {
      return (i < 10) ? "0" + i : "" + i;
  }
}
