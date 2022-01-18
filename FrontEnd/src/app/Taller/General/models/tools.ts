import {Mus} from "./mus";

export class Tools {
  id: number;
  muId: Mus;
  name: string;
  description: string;
  quantity: number;
  cost: number;

  constructor(id: number,
              muId: Mus,
              name: string,
              description: string,
              quantity: number,
              cost: number) {
    this.id = id;
    this.muId = muId;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.cost = cost;
  }

  static fromJson(json: any): Tools {
    return new Tools(
      json.id ?? 0,
      Mus.fromJson(json.mu_id ?? {}),
      json.name ?? '',
      json.description ?? '',
      json.quantity ?? 0,
      json.cost ?? 0
    );
  }
}
