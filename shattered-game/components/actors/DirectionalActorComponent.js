'use strict';
import { serializable } from 'shattered-lib/lib/jsonc';
import ActorComponent from './ActorComponent';
import ROT from 'shattered-lib/lib/rot-js';
import Event from 'shattered-lib/event-system/Event';
import events from '/eventTypes';

@serializable('DirectionalActorComponent')
class DirectionalActorComponent extends ActorComponent {
  constructor(game, options={}) {
    super(game);
    this.options = options;
  }

  act() {
    const tile = this.entity.tile;

    const event = new Event(events.onPosition);
    event.data.destination = tile.level.getTileAtXY(x + this.options.x, y + this.options.y);
    this.entity.emit(event);

    return options.moveTime;
  }
}
DirectionalActorComponent._name = 'directionalActor';

export default DirectionalActorComponent;
