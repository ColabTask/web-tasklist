export class Project {
  id: number;
  name: string;
  right: string;

  constructor(data:Object = {}) {
    this.id = data['id']||null,
    this.name = data['name']||'',
    this.right = data['right']||''
  }
}
