export class User {
  id: number;
  username: string;

  constructor(data:Object = {}) {
    this.id = data['id']||null,
    this.username = data['username']||''
  }
}
