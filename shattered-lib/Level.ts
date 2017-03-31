'use strict';
import {serializable} from 'jcson';
import Point from 'Point';
import LevelMap from 'LevelMap';

let levelId = 0;

@serializable('Level')
export class Level {
  private _map: LevelMap;
  id = levelId++;

  constructor(private theme: string) { }

  get map() {
    return this._map;
  }

  set map(map) {
    this._map = map;
    if (map)
      this._map.level = this;
  }

  getTileAt(point: Point) {
    return this.getTileAtXY(point.x, point.y);
  }

  getTileAtXY(x: number, y: number) {
    const row = this._map[x];
    if (!row)
      return;
    return row[y];
  }
}

export default Level;
