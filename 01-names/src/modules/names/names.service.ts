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

      return true;
    }
    return false;
  }

  getNames(start?: string) {
    if (!start) {
      return this._names;
    } else {
      return this._names.filter((n) =>
        n
          .toLocaleLowerCase()
          .trim()
          .startsWith(start.toLocaleLowerCase().trim()),
      );
    }
  }
}
