'use strict';

class Map extends Array {
  level = null;

  constructor(width = 0, height = 0) {
    super(width);
    this.width = width;
    this.height = height;
    for (let x = 0; x < width; x++)
      this[x] = new Array(height);
  }
}

export default Map;
