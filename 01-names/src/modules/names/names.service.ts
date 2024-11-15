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

  updateName(name: string, newName: string) {
    const indexNameFound = this._names.findIndex(
      (n) => n.toLowerCase().trim() == name.toLowerCase().trim(),
    );
    const indexNewNameFound = this._names.findIndex(
      (n) => n.toLowerCase().trim() == newName.toLowerCase().trim(),
    );
    console.log(this._names, indexNameFound, newName);

    if (indexNameFound != -1 && indexNewNameFound == -1) {
      this._names[indexNameFound] = newName;
      return true;
    } else {
      return false;
    }
  }

  deleteName(name: string) {
    const deletedBefore = this._names.length;
    this._names = this._names.filter(
      (n) => n.toLowerCase().trim() != name.toLowerCase().trim(),
    );
    const deletedAfter = this._names.length;
    return deletedBefore != deletedAfter;
  }

  clearNames() {
    this._names = [];
    return true;
  }
}
