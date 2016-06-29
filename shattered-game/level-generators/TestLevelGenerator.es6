'use strict';

import Level from 'shattered-lib/Level';
import Map from 'shattered-lib/Map';
import Tile from 'shattered-lib/Tile';
import Point from 'shattered-lib/Point';

import ROT from 'rot-js';

export default class TestLevelGenerator {
  theme = 'test';

  constructor(game = {}) {
    this._entityGenerator = game.entityGenerator;
  }

  generate() {
    const level = new Level(this._theme);
    level.map = this._generateMap();
    this._addCreatures(level.map);
    return level;
  }

  _generateMap() {
    const generateTile = _generateTile.bind(this);
    const width = 20, height = 20;
    const map = new Map(width, height);

    for (let x = 0; x < map.length; x++)
      for (let y = 0, column = map[x]; y < column.length; y++)
        column[y] = generateTile(x, y);

    return map;


    function _generateTile(x, y) {
      const tile = new Tile(new Point(x, y), map);
      tile.architecture = this._entityGenerator.generateByName('dirtFloor');
      return tile;
    }
  }

  _addCreatures(map) {
    const numberOfTiles = map.width * map.height;

    const numberOfMonsters = numberOfTiles / 3;
    const availableLocations = [];
    for (i = 1; i < numberOfTiles; i++)
      availableLocations.push(i);

    for (let i = 0; i < numberOfMonsters; i++) {
      if (!availableLocations.length) break;
      const nextMonsterIndex = ROT.RNG.getUniformInt(0, availableLocations.length - 1);
      const tile = map[Math.floor(nextMonsterIndex / map.height)][nextMonsterIndex % map.height];
      tile.addOccupant(this._entityGenerator.generateByName('munchkin'));

      availableLocations.splice(nextMonsterIndex, 1);
    }
  }
}

TestLevelGenerator.__type__ = 'TestLevelGenerator';
