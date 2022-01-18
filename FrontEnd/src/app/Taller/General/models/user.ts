export class User {
  id: number;
  name: string;
  email: string;

  constructor(id: number = 0,
              name: string = '',
              email: string = '') {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static fromJson(json: any): User {
    return new User(
      json.id ?? 0,
      json.adminpaq_id ?? 0,
      json.serie ?? ''
    );
  }
}
