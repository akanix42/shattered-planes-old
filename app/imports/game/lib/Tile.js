'use strict';
import EntitiesByPriority from './EntitiesByPriority';

class Tile {
  _entities = new EntitiesByPriority();

  constructor(point, map) {
    // super();
    this.point = point;
    this.map = map;
  }

  get level() {
    return this.map.level;
  }

  addEntity(entity, priority) {
    this._entities.add(entity, priority);
  }

  getEntitiesInSpace(space) {
    const updatedEvent = this._entities.emit({name: 'onGet.location.space', space});
    return updatedEvent.entities;
  }
}

export default Tile;
