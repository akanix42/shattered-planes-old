'use strict';

import {serializable} from 'jcson';

@serializable('IncrementalSet')
export default class IncrementalSet {
  _items = new Map();

  add(value: any) {
    const count = (this._items.get(value) || 0) + 1;
    this._items.set(value, count);
  }

  delete(value: any) {
    const count = (this._items.get(value) || 0) - 1;

    if (count < 0)
      return;

    if (count === 0) {
      this._items.delete(value);
      return;
    }

    this._items.set(value, count);
  }
  
  has(value: any) {
    return this._items.has(value);
  }

}
