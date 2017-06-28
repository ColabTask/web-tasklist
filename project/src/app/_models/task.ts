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

  getFullEndDate() {
    let day = this._padStr(this.end_date.getUTCDate());
    let month = '';
    let year = this._padStr(this.end_date.getFullYear());

    console.log(this.end_date.getMonth());
    switch ( this.end_date.getMonth() ) {
      case 0 :
        month = 'January';
        break;
      case 1 :
        month = 'February';
        break;
      case 2 :
        month = 'March';
        break;
      case 3 :
        month = 'April';
        break;
      case 4 :
        month = 'May';
        break;
      case 5 :
        month = 'June';
        break;
      case 6 :
        month = 'July';
        break;
      case 7 :
        month = 'August';
        break;
      case 8 :
        month = 'September';
        break;
      case 9 :
        month = 'October';
        break;
      case 10 :
        month = 'November';
        break;
      case 11 :
        month = 'December';
        break;
    }

    console.log(month);
    return month + ' ' + day;
  }

  getEndDateHuman() {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0, 0);

    let tomorrow = new Date;
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0, 0);
    tomorrow.setSeconds(tomorrow.getSeconds() + 86400);

    let afterTomorrow = new Date;
    afterTomorrow.setHours(0);
    afterTomorrow.setMinutes(0);
    afterTomorrow.setSeconds(0, 0);
    afterTomorrow.setSeconds(afterTomorrow.getSeconds() + 86400*2);

    let week = new Date;
    week.setHours(0);
    week.setMinutes(0);
    week.setSeconds(0, 0);
    week.setSeconds(week.getSeconds() + 86400*7);

    if (this.end_date.getTime() >= today.getTime() && this.end_date.getTime() < tomorrow.getTime()) {
      return 'Today - (' + this.getFullEndDate() + ')';
    }
    else if (this.end_date.getTime() >= tomorrow.getTime() && this.end_date.getTime() < afterTomorrow.getTime()) {
      return 'Tomorrow - (' + this.getFullEndDate() + ')';
    }
    else if (this.end_date.getTime() >= afterTomorrow.getTime() && this.end_date.getTime() < week.getTime()) {
      switch ( this.end_date.getDay() ) {
        case 0 :
          return 'Sunday - (' + this.getFullEndDate() + ')';
        case 1 :
          return 'Monday - (' + this.getFullEndDate() + ')';
        case 2 :
          return 'Tuesday - (' + this.getFullEndDate() + ')';
        case 3 :
          return 'Wenesday - (' + this.getFullEndDate() + ')';
        case 4 :
          return 'Thursday - (' + this.getFullEndDate() + ')';
        case 5 :
          return 'Friday - (' + this.getFullEndDate() + ')';
        case 6 :
          return 'Saturday - (' + this.getFullEndDate() + ')';
      }
    }
    else {
      return this.getFullEndDate();
    }
  }

  _padStr(i) {
      return (i < 10) ? "0" + i : "" + i;
  }
}
