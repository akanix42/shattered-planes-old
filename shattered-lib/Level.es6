'use strict';
import {serializable} from 'shattered-lib/lib/jsonc';

let levelId = 0;

@serializable('Level')
class Level {
  _map = null;
  id = levelId++;

  constructor(theme) {
    this._theme = theme;
  }

  get map() {
    return this._map;
  }

  set map(map) {
    this._map = map;
    if (map)
      this._map.level = this;
  }

  getTileAt(point) {
    return this.getTileAtXY(point.x, point.y);
  }

  getTileAtXY(x, y) {
    const row = this._map[x];
    if (!row)
      return;
    return row[y];
  }
}

export default Level;
