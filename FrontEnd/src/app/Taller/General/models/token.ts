import {User} from "./user";

export class Token {
  token: string;
  user: User;

  constructor(token: string = '',
              user: User = User.fromJson({})) {
    this.token = token;
    this.user = user;
  }

  static fromJson(json: any): Token {
    return new Token(
      json.token ?? '',
      User.fromJson(json.user ?? {})
    );
  }
}
