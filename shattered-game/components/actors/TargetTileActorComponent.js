'use strict';
import { serializable } from 'shattered-lib/lib/jsonc';
import ActorComponent from './ActorComponent';
import ROT from 'shattered-lib/lib/rot-js';
import Event from 'shattered-lib/event-system/Event';
import events from '/eventTypes';
import { getPathToTarget } from '/pathfinding/pathToTarget';

@serializable('TargetTileActorComponent')
export default class TargetTileActorComponent extends ActorComponent {
  targetTile = null;
  path = null;

  constructor(game, options = {}) {
    super(game);
    this.options = options;
  }

  init() {
    this.targetTile = this.entity.tile.level.getTileAtXY(this.options.x, this.options.y);
    this.path = getPathToTarget(this.entity.tile, this.targetTile);
  }

  act() {
    const tile = this.entity.tile;
    if (tile === this.targetTile || this.path.length === 0) return this.options.moveTime;

    const event = new Event(events.onPosition);
    event.data.destination = this.path.shift();
    this.entity.emit(event);

    return this.options.moveTime;
  }

}
TargetTileActorComponent._name = 'targetTileActor';
