import { Injectable } from '@nestjs/common';

@Injectable()
export class NamesService {
  private _names: string[];
  constructor() {
    this._names = [];
  }

  createName(name: string) {
    this._names.push(name);
    console.log(`Nombres: ${this._names}`);

    return true;
  }
}
