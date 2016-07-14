'use strict';
import EntitiesByPriority from './EntitiesByPriority';
import Inventory from './Inventory';
import PrioritizedHandlers from './event-system/PrioritizedHandlers';
import events from '/event-system/eventTypes';
import Event from '/event-system/Event';

import { serializable } from '/lib/jsonc';

@serializable('Tile')
export default class Tile {
  _architecture = null;
  _handlers = new PrioritizedHandlers();
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
    }
  }

  addOccupant(occupant) {
    this.occupants.push(occupant);
    occupant.tile = this;

    const event = new Event(events.onEntityAdded);
    event.data.tile = this;
    this.emit(event);
  }

  removeOccupant(occupant) {
    const index = this.occupants.indexOf(occupant);
    if (index === -1)
      return;

    this.occupants.splice(index, 1);
    occupant.tile = null;
    const event = new Event(events.onEntityRemoved);
    event.data.tile = this;
    this.emit(event);
  }

  emit(event) {
    for (let i = 0; i < event.type.priorities.array.length; i++) {
      let priority = event.type.priorities.array[i];
      this._architecture.subscribedHandlers.emitTo(priority, event);
      if (event.isCanceled) return event;

      for (let j = 0; j < this.occupants.length; j++) {
        this.occupants[j].subscribedHandlers.emitTo(priority, event);
        if (event.isCanceled) return event;
      }

      this._handlers.emitTo(priority, event);
      if (event.isCanceled) return event;
    }
    return event;
  }

}
