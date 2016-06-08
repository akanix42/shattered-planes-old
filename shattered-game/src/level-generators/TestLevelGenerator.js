'use strict';

import Level from 'shattered-lib/Level';
import Map from 'shattered-lib/Map';
import Tile from 'shattered-lib/Tile';
import Point from 'shattered-lib/Point';
import EntityGenerator from 'shattered-lib/generators/EntityGenerator';

export default class TestLevelGenerator {
  _entityGenerator = new EntityGenerator();
  theme = 'test';

  generate() {
    const level = new Level(this._theme);
    level.map = this._generateMap();
    return level;

  }

  _generateMap() {
    const map = new Map();
    const size = 20;
    const tiles = map.tiles = new Array(size);
    for (let x = 0; x < tiles.length; x++)
      tiles[x] = new Array(size);

    for (let x = 0; x < tiles.length; x++)
      for (let y = 0, column = tiles[x]; y < column.length; y++)
        column[y] = generateTile.call(this);

    return map;


    function generateTile() {
      const tile = new Tile(new Point(x, y), map);
      tile.addEntity(this._entityGenerator.generate('dirtFloor'));
      return tile;
    }
  }
}
