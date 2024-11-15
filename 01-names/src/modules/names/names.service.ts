import { Injectable } from '@nestjs/common';

@Injectable()
export class NamesService {
  private _names: string[];
  constructor() {
    this._names = [];
  }

  createName(name: string) {
    const nameFound = this._names.find(
      (n) => n.toLocaleLowerCase().trim() == name.toLocaleLowerCase().trim(),
    );
    if (!nameFound) {
      this._names.push(name);
      console.log(`Nombres: ${this._names}`);

      return true;
    }
    return false;
  }
}