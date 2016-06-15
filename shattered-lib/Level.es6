'use strict';

let levelId = 0;

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
    const row = this._map[point.x];
    if (!row)
      return;
    return row[point.y];
  }
}

export default Level;
