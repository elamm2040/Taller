export class Mus {
  id: number;
  name: string;
  description: string;

  constructor(id: number = 0,
              name: string = '',
              description: string = '') {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static fromJson(json: any): Mus {
    return new Mus(
      json.id ?? 0,
      json.name ?? 0,
      json.description ?? ''
    );
  }
}
