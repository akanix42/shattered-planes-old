'use strict';
import {serializable} from 'jcson';
import Level from 'Level';

@serializable('LevelMap')
class LevelMap extends Array {
  level: Level;

  constructor(public width = 0, public height = 0) {
    super(width);
    for (let x = 0; x < width; x++)
      this[x] = new Array(height);
  }
}

export default LevelMap;
