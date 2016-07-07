'use strict';

import Level from 'shattered-lib/Level';
import Map from 'shattered-lib/Map';
import Tile from 'shattered-lib/Tile';
import Point from 'shattered-lib/Point';

import ROT from 'shattered-lib/lib/rot-js';

export default class TestLevelGenerator {
  theme = 'test';

  constructor(game) {
    if (arguments.length === 0) return this;

    this._entityGenerator = game.entityGenerator;
  }

  generate(options) {
    options = {...{ width: 10, height: 10 }, ...options, };

    const level = new Level(this._theme);
    level.map = this._generateMap(options);
    this._addCreatures(level.map, options);
    return level;
  }

  _generateMap(options) {
    const generateTile = _generateTile.bind(this);
    const { width, height } = options;
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

  _addCreatures(map, options) {
    const numberOfTiles = map.width * map.height;

    const numberOfCreatures = options.numberOfCreatures || Math.floor(numberOfTiles / 6);
    if (numberOfCreatures === 0)
      return;

    const availableLocations = [];
    for (let i = 1; i < numberOfTiles; i++)
      availableLocations.push(i);

    for (let i = 0; i < numberOfCreatures; i++) {
      if (!availableLocations.length) break;
      const nextMonsterIndex = availableLocations[ROT.RNG.getUniformInt(0, availableLocations.length - 1)];
      const tile = map[Math.floor(nextMonsterIndex / map.height)][nextMonsterIndex % map.height];
      tile.addOccupant(this._entityGenerator.generateByName('munchkin'));

      availableLocations.splice(nextMonsterIndex, 1);
    }
  }
}

TestLevelGenerator.__type__ = 'TestLevelGenerator';
