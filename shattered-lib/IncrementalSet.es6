'use strict';

import {serializable} from 'shattered-lib/lib/jsonc';

@serializable('IncrementalSet')
export default class IncrementalSet {
  _items = new Map();

  add(value) {
    const count = (this._items.get(value) || 0) + 1;
    this._items.set(value, count);
  }

  delete(value) {
    const count = (this._items.get(value) || 0) - 1;

    if (count < 0)
      return;

    if (count === 0) {
      this._items.delete(value);
      return;
    }

    this._items.set(value, count);
  }
  
  has(value) {
    return this._items.has(value);
  }

}
