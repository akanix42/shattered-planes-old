'use strict';
import EntitiesByPriority from './EntitiesByPriority';
import Inventory from './Inventory';
import SubscribedHandlers from './SubscribedHandlers';
import events from '/events';


class Tile {
  _architecture = null;
  _handlers = new SubscribedHandlers();
  inventory = new Inventory();
  occupants = [];

  constructor(point, map) {
    this.point = point;
    this.map = map;
  }

  get level() {
    return this.map.level;
  }

  get architecture() {
    return this._architecture;
  }

  set architecture(architecture) {
    const previousArchitecture = this._architecture;
    if (previousArchitecture)
      this._removeHandlers(previousArchitecture);

    this._architecture = architecture;
    if (architecture) {
      architecture.tile = this;
      this._addHandlers(architecture);
    }
  }

  addOccupant(occupant) {
    this.occupants.push(occupant);
    occupant.tile = this;

    this._addHandlers(occupant);
    this.emit({name: events.onEntityAdded, tile: this});
  }

  removeOccupant(occupant) {
    const index = this.occupants.indexOf(occupant);
    if (index === -1)
      return;

    this.occupants.splice(index, 1);
    occupant.tile = null;
    this._removeHandlers(occupant);
    this.emit({name: events.onEntityRemoved, tile: this});
  }

  _addHandlers(entity) {
    const keys = Object.keys(entity.subscribedHandlers._handlersByEvent);
    keys.forEach(key=> {
      entity.subscribedHandlers._handlersByEvent[key].forEach(handler=>this._handlers.add(handler));
    });
  }

  _removeHandlers(entity) {
    const keys = Object.keys(entity.subscribedHandlers._handlersByEvent);
    keys.forEach(key=> {
      entity.subscribedHandlers._handlersByEvent[key].forEach(handler=>this._handlers.remove(handler));
    });
  }

  emit(event) {
    return this._handlers.emit(event);
  }
}

export default Tile;
