'use strict';
import EntitiesByPriority from './EntitiesByPriority';
import Inventory from './Inventory';
import PrioritizedHandlers from './event-system/PrioritizedHandlers';
import events from 'event-system/eventTypes';
import Event from 'event-system/Event';

import { serializable } from 'jcson';
import Point from 'Point';
import LevelMap from 'LevelMap';
import Entity from 'Entity';

@serializable('Tile')
export default class Tile {
  _architecture: Entity;
  _handlers = new PrioritizedHandlers();
  inventory = new Inventory();
  occupant: Entity | null = null;

  constructor(private point: Point, private map: LevelMap) { }

  get level() {
    return this.map.level;
  }

  get architecture() {
    return this._architecture;
  }

  set architecture(architecture) {
    this._architecture = architecture;
    if (architecture) {
      architecture.tile = this;
    }
  }

  addOccupant(occupant: Entity) {
    this.occupant = occupant;
    occupant.tile = this;

    const event = new Event(events.onEntityAdded);
    event.data.tile = this;
    this.emit(event);
  }

  removeOccupant(occupant: Entity) {
    if (this.occupant !== occupant)
      return;
    this.occupant = null;
    occupant.tile = null;

    const event = new Event(events.onEntityRemoved);
    event.data.tile = this;
    this.emit(event);
  }

  addTransient(transient) {
    this.transients.push(transient);
    transient.tile = this;

    const event = new Event(events.onEntityAdded);
    event.data.tile = this;
    this.emit(event);
  }

  removeTransient(transient) {
    let index = this.transients.indexOf(transient);
    // if (index === -1) return;
    this.transients.splice(index, 1);
    transient.tile = null;

    const event = new Event(events.onEntityRemoved);
    event.data.tile = this;
    this.emit(event);
  }

  emit(event: Event) {
    const shouldEmitToArchitecture = this._architecture.subscribedHandlers.numberOfHandlers > 0;
    const shouldEmitToOccupant = this.occupant !== null;
    const shouldEmitToSelf = this._handlers.numberOfHandlers > 0;
    const shouldEmitToTransients = this.transients.length > 0;

    for (let i = 0; i < event.type.priorities.array.length; i++) {
      let priority = event.type.priorities.array[i];
      if (shouldEmitToArchitecture) {
        this._architecture.subscribedHandlers.emitTo(priority, event);
        if (event.isCanceled) return event;
      }

      if (shouldEmitToOccupant) {
        (<Entity>this.occupant).subscribedHandlers.emitTo(priority, event);
        if (event.isCanceled) return event;
      }

      if (shouldEmitToTransients) {
        for (let i = 0; i < this.transients.length; i++) {
          this.transients[i].subscribedHandlers.emitTo(priority, event);
          if (event.isCanceled) return event;
        }
      }

      if (shouldEmitToSelf) {
        this._handlers.emitTo(priority, event);
        if (event.isCanceled) return event;
      }
    }
    return event;
  }

}
